<template>
	<v-card style="height: 100%; border: none" outlined>
		<v-card-title class="justify-center">YOUR PRIVATE GALLERY</v-card-title>
		<v-container>
			<v-row style="width: 100%">
				<div v-for="pic in pictures" :key="pic.id">
					<!-- picture card -->
					<v-col>
						<v-hover>
							<template v-slot:default="{ hover }">
								<v-card
									style="width: 150px; padding-top: 20px"
									class="justify-center"
								>
									<v-img
										style="margin-inline: 20px"
										maxWidth="100%"
										height="100px"
										:src="pic.url"
									></v-img>

									<v-card-title
										class="justify-center"
										style="text-align: center"
										>{{ pic.name }}</v-card-title
									>

									<v-fade-transition>
										<v-overlay
											style=""
											justify="center"
											align="center"
											v-if="hover"
											absolute
											color="#036358"
										>
											<v-btn fab @click="editImage(pic)">
												<v-icon>mdi-pencil</v-icon>
											</v-btn>
										</v-overlay>
									</v-fade-transition>
								</v-card>
							</template>
						</v-hover>
					</v-col>
				</div>
			</v-row>
		</v-container>
		<v-card-actions class="justify-center">
			<v-btn color="primary" class="menu-btn" outlined @click="addNewPic()">Add photo</v-btn>
		</v-card-actions>

		<!-- edit picture dialog -->
		<v-dialog v-model="editPicDialog" max-width="290" max-height="400">
			<v-card class="justify-center" align="center">
				<v-card-title class="text-h5 justify-center"> Edit picture </v-card-title>

				<v-img
					style="margin-inline: 20px"
					maxWidth="80%"
					maxHeight="50%"
					:src="editPic.url"
				></v-img>

				<v-text-field
					style="width: 80%; margin-top: 10px"
					label="Name"
					required
					v-model="editPic.name"
				></v-text-field>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red" text @click="deleteEditPic()"> Delete </v-btn>
					<v-btn color="blue darken-1" text @click="editPicDialog = false"> Close </v-btn>
					<v-btn color="blue darken-1" text @click="saveEditPic()"> Save </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- add picture dialog -->
		<v-dialog v-model="addPicDialog" max-width="290" max-height="400">
			<v-card class="justify-center" align="center">
				<v-card-title class="text-h5 justify-center" justify="center" align="center">
					Add picture
				</v-card-title>

				<!-- pic preview -->
				<v-img
					v-if="addPic.url !== ''"
					style="margin-inline: 20px"
					maxWidth="80%"
					maxHeight="50%"
					:src="addPic.url"
				></v-img>

				<!-- pic path input -->
				<v-file-input
					style="width: 80%; margin-top: 10px"
					v-model="newPicture"
					label="Upload a picture"
					:error-messages="profilePictureErrors"
					prepend-icon="mdi-camera"
					@change="onFileChange"
					accept="image/*"
				/>

				<!-- name imput -->
				<v-text-field
					style="width: 80%; margin-top: 10px"
					label="Name"
					required
					v-model="addPic.name"
				></v-text-field>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="addPicDialog = false"> Close </v-btn>
					<v-btn
						:disabled="addPic.url == '' || addPic.name == '' || addPicIsInError"
						:enabled="false"
						color="blue darken-1"
						text
						@click="saveAddPic()"
					>
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script>
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
	name: "GalleryTab",
	data: () => ({
		pictures: [
			// {
			//     id: 1,
			//     url: require('../../assets/mucekPupa.png'),
			//     name: "mucek Pupa"
			// },
			// {
			//     id: 2,
			//     url: require('../../assets/typedog.png'),
			//     name: "kuza"
			// },
			// {
			//     id: 3,
			//     url: require('../../assets/typedog.png'),
			//     name: "kuza"
			// },
		],
		slikca: "../../assets/userPageBackground.png",
		overlay: false,

		editPicDialog: false,
		editPic: {},

		addPicDialog: false,
		addPicTemplate: {
			id: 0,
			url: "",
			name: "",
		},
		addPic: {},
		newPicture: {},
	}),
	validations: {
		newPicture: {
			fileSizeValidation,
			fileTypeValidation,
		},
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
		authStatus() {
			return this.$store.getters.authStatus;
		},
		adsAndRequestsButtonTxt() {
			var txt = "Requests";
			if (this.user && this.user.role != undefined && this.user === "Pet sitter") txt = "Ads";
			return txt;
		},
		profilePictureErrors() {
			const errors = [];
			if (!this.$v.newPicture.$dirty) return [];
			!this.$v.newPicture.fileSizeValidation && errors.push("File size error!");
			!this.$v.newPicture.fileTypeValidation &&
				errors.push("Invalid file type! Supported: .jpeg, .png");

			return errors;
		},
		addPicIsInError() {
			if (this.addPic.url === "") return false;
			else
				return (
					!this.$v.newPicture.fileSizeValidation || !this.$v.newPicture.fileTypeValidation
				);
		},
	},
	methods: {
		getProfilePicUrl() {
			var a =
				this.$store.state.serverBaseUrl + "img/" + this.$store.getters.user.profilePicture;
			// console.log("profilePicPath", a);
			return a;
		},
		menuButtonClick(name) {
			if (name) this.menuTab = name;
		},
		editImage(pic) {
			this.editPic = { ...pic };
			this.editPicDialog = true;
			console.log(pic);
		},
		saveEditPic() {
			this.editPicDialog = false;
			this.pictures.find((pic) => pic.id == this.editPic.id).name = this.editPic.name;

			// TODO: edit API call
		},
		deleteEditPic() {
			this.editPicDialog = false;
			this.pictures = this.pictures.filter((pic) => pic.id !== this.editPic.id);

			// TODO: delete API call
		},
		addNewPic() {
			this.addPicDialog = true;
			this.addPic = { ...this.addPicTemplate };

			console.log("this addpic: ");
			console.log(this.addPic);

			this.addPic.id = Math.floor(Math.random() * 100000); //create a 'random' id
			this.newPicture = {};
		},
		saveAddPic() {
			this.addPicDialog = false;

			const formData = new FormData();
			formData.set("picture", this.newPicture);
			formData.set("title", this.addPic.name);

			axios
				.post("/api/user/gallery", formData, {
					headers: {
						"Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
					},
				})
				.then((res) => {
					// TODO:
					console.log("RES: ");
					console.log(res);
				})
				.catch((err) => {
					console.log("Caught error: ", err.response?.data?.message || err.message);
					this.formSubmitErrors = err.response?.data?.message || err.message;
				});
		},
		onFileChange(file) {
			this.$v.newPicture.$touch();
			if (!file) {
				this.addPic.url = "";
			} else {
				const reader = new FileReader();
				reader.onload = (e) => {
					this.addPic.url = e.target.result;
				};
				reader.readAsDataURL(file);
			}

			// //check validation and update button enabled status
			// if(this.$v.newPicture.fileSizeValidation && this.$v.newPicture.fileTypeValidation) {
			//     this.addPic.isInError = false;
			//     console.log("OnFileChange: not in error");
			// }
			// else if (this.addPic.url === '')
			//     this.addPic.isInError = false;
			// else
			//     this.addPic.isInError = true;
		},
	},
	components: {},
};
</script>

<style scoped>
.border-container {
	height: 200px;
	width: 150px;
	border-style: solid;
	border-width: 1px;
	border-color: #448aff;
	border-radius: 5px;
	/* padding-block: 30px; */
}
p {
	margin: 0 !important;
}
</style>
