<template>
	<div class="center">
		<h1>Sign In</h1>
		<form>
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
				counter
				@click:append="showPasswords = !showPasswords"
				@change="$v.password.$touch()"
				@blur="$v.password.$touch()"
			></v-text-field>

			<v-btn class="mr-4" @click="submit"> submit </v-btn>
		</form>
	</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
	name: "login",
	validations: {
		email: { required },
		password: { required },
	},
	data: () => ({
		email: "",
		password: "",
		showPasswords: false,
	}),
	methods: {
		submit() {
			this.$v.$touch(); // preveri se enkrat i guess?
		},
	},
	computed: {
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return [];
			!this.$v.email.required && errors.push("E-mail is required");
			return errors;
		},

		passwordErrors() {
			const errors = [];
			if (!this.$v.password.$dirty) return [];
			!this.$v.password.required && errors.push("Password is required");
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
