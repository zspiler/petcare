<template>
	<div class="center">
		<h1>Create Account</h1>
		<form>
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

			<v-text-field
				v-model="password"
				:error-messages="passwordErrors"
				:append-icon="showPasswords ? 'mdi-eye' : 'mdi-eye-off'"
				:type="showPasswords ? 'text' : 'password'"
				name="password"
				label="Password"
				hint="Should be at least 8 characters"
				counter
				@click:append="showPasswords = !showPasswords"
				@change="$v.password.$touch()"
				@blur="$v.password.$touch()"
			></v-text-field>

			<v-text-field
				v-model="repeatPassword"
				:error-messages="repeatPasswordErrors"
				:append-icon="showPasswords ? 'mdi-eye' : 'mdi-eye-off'"
				:type="showPasswords ? 'text' : 'password'"
				name="repeatPassword"
				label="Confirm password"
				@click:append="showPasswords = !showPasswords"
				@change="$v.repeatPassword.$touch()"
				@blur="$v.repeatPassword.$touch()"
			></v-text-field>

			<v-select
				v-model="select"
				:items="roles"
				:error-messages="selectErrors"
				label="Role"
				required
				@change="$v.select.$touch()"
				@blur="$v.select.$touch()"
			/>

			<v-file-input
				v-model="profilePicture"
				label="Profile picture (optional)"
				:error-messages="profilePictureErrors"
				prepend-icon="mdi-camera"
				@change="onFileChange"
				accept="image/*"
			/>

			<!-- Profile picture preview -->
			<v-img
				v-if="profilePictureUrl.length && this.$v.profilePicture.fileTypeValidation"
				:src="profilePictureUrl"
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

			<!-- ce dam kot zgoraj :error-messages breaka input field text -->
			<p v-if="locationErrors" style="color: red">{{ locationErrors }}</p>

			<v-btn class="mr-4" @click="submit"> submit </v-btn>
		</form>
		<ScaleLoader class="loader" v-if="authStatus === 'loading'" />
	</div>
</template>

<script>
import { required, maxLength, email, minLength, sameAs } from "vuelidate/lib/validators";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

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
	name: "register",
	components: { ScaleLoader },
	validations: {
		firstName: { required, maxLength: maxLength(20) },
		lastName: { required, maxLength: maxLength(20) },
		email: { required, email },
		select: { required },
		profilePicture: {
			fileSizeValidation,
			fileTypeValidation,
		},
		password: { required, minLength: minLength(8) },
		repeatPassword: { sameAsPassword: sameAs("password") },
		location: { required },
	},
	mounted() {
		this.initGooglePlacesSearch();
	},
	data: () => ({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		repeatPassword: "",
		select: null,
		roles: ["Pet sitter", "Owner"],
		profilePicture: null,
		profilePictureUrl: "",
		showPasswords: false,
		location: "",
		locationChanged: false,
		locationText: "",
		locationErrors: "",
	}),
	methods: {
		submit() {
			// Validate
			this.$v.$touch();

			if (!this.validateLocation() || this.$v.$error) {
				return;
			}
			// Create FormData (necessary for file upload)
			const formData = new FormData();
			formData.set("profilePicture", this.profilePicture);
			formData.set("firstName", this.firstName);
			formData.set("lastName", this.lastName);
			formData.set("email", this.email);
			formData.set("password", this.password);
			formData.set("role", this.role);
			formData.set("location", JSON.stringify(this.location.address_components));

			this.$store
				.dispatch("register", formData)
				.then(() => {
					this.$router.push("/");
				})
				.catch((err) => {
					console.log(err);
				});
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
			autocomplete.addListener("place_changed", () => {
				const place = autocomplete.getPlace();
				this.locationChanged = true;
				if (!place.geometry) {
					// user presses enter
					this.location = "";
				} else {
					this.location = place;
				}
				this.validateLocation();
			});
		},
		validateLocation() {
			if (this.location === "") {
				this.locationErrors = "Location is required";
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
		authStatus() {
			return this.$store.getters.authStatus;
		},
		selectErrors() {
			const errors = [];
			if (!this.$v.select.$dirty) return [];
			!this.$v.select.required && errors.push("Please select a role");
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
		passwordErrors() {
			const errors = [];
			if (!this.$v.password.$dirty) return [];
			!this.$v.password.required && errors.push("Password is required");
			!this.$v.password.minLength &&
				errors.push("Password should be at least 8 characters long");
			return errors;
		},
		repeatPasswordErrors() {
			const errors = [];
			if (!this.$v.repeatPassword.$dirty) return [];
			!this.$v.repeatPassword.sameAsPassword && errors.push("Passwords do not match");
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
