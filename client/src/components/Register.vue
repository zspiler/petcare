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
			<v-select
				v-model="select"
				:items="items"
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
			/>

			<!-- Profile picture preview -->
			<v-img
				v-if="
					profilePictureUrl.length &&
					this.$v.profilePicture.fileTypeValidation
				"
				:src="profilePictureUrl"
			/>

			<v-btn class="mr-4" @click="submit"> submit </v-btn>
		</form>
	</div>
</template>

<script>
import { required, maxLength, email } from "vuelidate/lib/validators";

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
	name: "Register",
	validations: {
		firstName: { required, maxLength: maxLength(20) },
		lastName: { required, maxLength: maxLength(20) },
		email: { required, email },
		select: { required },
		profilePicture: {
			fileSizeValidation,
			fileTypeValidation,
		},
	},
	data: () => ({
		firstName: "",
		lastName: "",
		email: "",
		select: null,
		items: ["Pet sitter", "Owner"],
		profilePicture: null,
		profilePictureUrl: "",
	}),
	methods: {
		submit() {
			this.$v.$touch(); // preveri se enkrat i guess?
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
	},
	computed: {
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
			!this.$v.firstName.required &&
				errors.push("First name is required.");
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
			!this.$v.profilePicture.fileSizeValidation &&
				errors.push("File size!");

			!this.$v.profilePicture.fileTypeValidation &&
				errors.push("File type!");

			return errors;
		},
	},
};
</script>

<style>
.center {
	position: absolute;
	top: 25%;
	left: 50%;
	margin-top: -50px;
	margin-left: -50px;
	transform: translate(-30%, -30%);
	width: 30%;
	height: 30%;
}
</style>
