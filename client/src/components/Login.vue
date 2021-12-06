<template>
	<v-container fill-height >
		<v-row justify="center" align="center">
			<v-col  md="6" lg="4" >
				<v-img
					style="margin-left:-30px"
					width=250
					src="../assets/petcareLogo2.svg"
				></v-img>
				<h1>Log In</h1>
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

					<v-btn class="mr-4" @click="submit" color="primary"> Login </v-btn>
					<router-link
						to="/register"
						style="text-decoration: none; color: inherit"
					>
						<v-btn class="mr-4" color="primary" outlined> Register </v-btn>
					</router-link>
				</form>
				
			</v-col>
			<v-col md="6" lg="8" >
				<v-img
					src="../assets/loginDogs.png"
				></v-img>
			</v-col>
		</v-row>
		<ScaleLoader class="loader" v-if="authStatus === 'loading'" />
	</v-container>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
	name: "login",
	components: { ScaleLoader },
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
			this.$v.$touch();

			if (this.$v.$error) {
				return;
			}

			this.$store
				.dispatch("login", {
					email: this.email,
					password: this.password,
				})
				.then(() => {
					this.$router.push("/");
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	computed: {
		authStatus() {
			return this.$store.getters.authStatus;
		},
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
