<template>
	<v-container fluid>
		<v-row justify="center" align="center">
			<h1>Edit Account</h1>
		</v-row>
		<v-row justify="space-around">
			<form style="width: 90%; margin-top: 40px">
				<v-row justify="space-around">
					<v-col cols="12" md="6" lg="4">
						<v-text-field
							v-model="firstName"
							:error-messages="firstNameErrors"
							:counter="20"
							label="First Name"
							required
							@input="$v.firstName.$touch()"
							@blur="$v.firstName.$touch()"
						/>
						<v-text-field
							v-model="lastName"
							:error-messages="lastNameErrors"
							:counter="20"
							label="Last Name"
							required
							@input="$v.lastName.$touch()"
							@blur="$v.lastName.$touch()"
						/>
						<v-text-field
							v-model="email"
							:error-messages="emailErrors"
							label="E-mail"
							required
							@input="$v.email.$touch()"
							@blur="$v.email.$touch()"
						/>
					</v-col>
					<v-col cols="12" md="6" lg="4">
						<v-select
							v-model="selectedRole"
							:items="roles"
							:error-messages="selectedRoleErrors"
							label="Role"
							required
							@change="$v.selectedRole.$touch()"
							@blur="$v.selectedRole.$touch()"
						/>
           
						<!-- Location -->
						<v-text-field
							v-model="locationText"
							label="Location"
							required
							id="autocomplete"
							@change="this.validateLocation"
							@blur="this.onLocationSearchBlur"
						/>

						<v-file-input
							v-model="profilePicture"
							label="Profile picture (optional)"
							:error-messages="profilePictureErrors"
							prepend-icon="mdi-camera"
							@change="onFileChange"
							accept="image/*"
						/>
					</v-col>
					<v-col
						cols="12"
						md="12"
						lg="2"
						justify="center"
						align="center"
						v-if="
							profilePictureUrl &&
							profilePictureUrl.length &&
							this.$v.profilePicture.fileTypeValidation
						"
					>
						<!-- Profile picture preview -->
						<v-row justify="center" align="center" style="height: 100%">
							<v-img
								max-height="100%"
								max-width="100%"
								v-if="
									profilePictureUrl.length &&
									this.$v.profilePicture.fileTypeValidation
								"
								:src="
									(profilePictureUrl.startsWith('profilePic')
										? `${this.$store.getters.serverBaseUrl}img/`
										: ``) + profilePictureUrl
								"
							/>
						</v-row>
					</v-col>
				</v-row>
				<v-row justify="center">
					<!-- ce dam kot zgoraj :error-messages breaka input field text -->
          
          
					<p v-if="locationErrors" style="color: red">{{ locationErrors }}</p>
				</v-row>
				<v-row>
					<v-col justify="center" align="center">
						<v-btn class="mb-2" @click="submit" color="primary"> Save changes </v-btn>
					</v-col>
				</v-row>
			</form>
		</v-row>
	</v-container>
</template>

<script>
import { required, maxLength, email } from "vuelidate/lib/validators";

import axios from "axios";

function fileSizeValidation(file) {
	if (!file) {
		return true;
	}
	return file.size <= 1000000; // 1 MB limit
}

function fileTypeValidation(file) {
	if (!file) {
		return true;
	}
	return /\.(jpe?g|png)$/.test(file.name);
}

export default {
	name: "AboutForm",
	components: {},
	validations: {
		firstName: { required, maxLength: maxLength(20) },
		lastName: { required, maxLength: maxLength(20) },
		email: { required, email },
		selectedRole: { required },
		profilePicture: {
			fileSizeValidation,
			fileTypeValidation,
		},
		location: { required },
	},
	data: () => ({
		firstName: "",
		lastName: "",
		email: "",
		selectedRole: null,
		roles: ["Pet sitter", "Owner"],
		profilePicture: null,
		profilePictureUrl: "",
		location: "",
		locationChanged: false,
		locationText: "",
		locationErrors: "",
	}),
	mounted() {
		if (this.$store.getters.user.email) {
			this.fillUserData();
			this.initGooglePlacesSearch();
		}
	},
	watch: {
		user() {
			// Wait for user to be loaded
			this.fillUserData();
			this.initGooglePlacesSearch();
		},
	},
	methods: {
		fillUserData() {
			this.firstName = this.user.firstName;
			this.lastName = this.user.lastName;
			this.email = this.user.email;
			this.selectedRole = this.user.role;
			this.locationText = this.user.city + ", " + this.user.country;
			this.profilePictureUrl = this.user.profilePicture;
		},
		submit() {
			// Validate
			this.$v.$touch();

			if (!this.validateLocation() || this.$v.$error) {
				return;
			}

			const data = this.createFormData();
			axios
				.put("/api/auth/user", data, {
					headers: {
						"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
					},
				})
				.then(() => {
					// ponovno nalozi userja
					this.$store.dispatch("getUser");
					this.$router.push("/");
				})
				.catch((err) => {
					console.log("Caught error: ");
					console.log(err.response?.data?.message || err.message);
				});
		},
		createFormData() {
			const formData = new FormData();
			if (this.profilePictureUrl.length) {
				formData.set("profilePicture", this.profilePicture);
			}
			formData.set("firstName", this.firstName);
			formData.set("lastName", this.lastName);
			formData.set("email", this.email);
			formData.set("role", this.selectedRole);
			formData.set("location", JSON.stringify(this.location.address_components));
			return formData;
		},
		onFileChange(file) {
			this.$v.profilePicture.$touch();
			if (!file) {
				this.profilePictureUrl = "";
			} else {
				const reader = new FileReader();
				reader.onload = (e) => {
					this.profilePictureUrl = e.target.result;
				};
				reader.readAsDataURL(file);
			}
		},

		initGooglePlacesSearch() {
			const options = {
				fields: ["formatted_address", "geometry", "name", "address_component"],
				types: ["(cities)"],
				componentRestrictions: { country: ["si"] },
			};
			const autocomplete = new window.google.maps.places.Autocomplete(
				document.getElementById("autocomplete"),
				options
			);

			document.getElementById("autocomplete").placeholder = "";

			// Initialize with user's Location (manually search)
			const geocoder = new window.google.maps.Geocoder();

			geocoder.geocode({ address: this.locationText }, (places) => {
				this.location = places[0];
				this.location.name = this.locationText;
			});

			autocomplete.addListener("place_changed", () => {
				const place = autocomplete.getPlace();
				this.locationChanged = true;
				if (!place.geometry) {
					// user presses enter
					this.location = "";
				} else {
					this.location = place;
					this.loactionText = place.name;
				}
				this.validateLocation();
			});
		},
		validateLocation() {
			if (this.locationChanged && this.location === "") {
				this.locationErrors = "Location is required";
				console.log("location BAD");
				return false;
			}
			this.locationErrors = "";
			return true;
		},
		onLocationSearchBlur() {
			this.validateLocation();
			if (this.location) {
				this.locationText = this.location.name;
			}
		},
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
		authStatus() {
			return this.$store.getters.authStatus;
		},
		selectedRoleErrors() {
			const errors = [];
			if (!this.$v.selectedRole.$dirty) return [];
			!this.$v.selectedRole.required && errors.push("Please select a role");
			return errors;
		},
		firstNameErrors() {
			const errors = [];
			if (!this.$v.firstName.$dirty) return [];
			!this.$v.firstName.maxLength &&
				errors.push("First name must be at most 20 characters long");
			!this.$v.firstName.required && errors.push("First name is required.");
			return errors;
		},
		lastNameErrors() {
			const errors = [];
			if (!this.$v.lastName.$dirty) return [];
			!this.$v.lastName.maxLength &&
				errors.push("Last name must be at most 20 characters long");
			!this.$v.lastName.required && errors.push("Last name is required.");
			return errors;
		},
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return [];
			!this.$v.email.email && errors.push("Must be valid e-mail");
			!this.$v.email.required && errors.push("E-mail is required");
			return errors;
		},
		profilePictureErrors() {
			const errors = [];
			if (!this.$v.profilePicture.$dirty) return [];
			!this.$v.profilePicture.fileSizeValidation && errors.push("File size!");
			!this.$v.profilePicture.fileTypeValidation && errors.push("File type!");
			return errors;
		},
	},
};
</script>

<style scoped>
.center {
	position: absolute;
	top: 25%;
	left: 50%;
	margin-top: -50px;
	margin-left: -50px;
	transform: translate(-30%, -30%);
	width: 40%;
	height: 30%;
}
</style>
