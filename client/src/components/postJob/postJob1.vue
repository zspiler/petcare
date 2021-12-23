<template>
	<v-container fill-height >
        <v-row justify="center" >
            <v-col  md="3" lg="3">

                <h1>Add animal</h1>

                <v-row align="center" style="margin-top: 10px">
                    <v-img
                        class="img-circle img-animated" 
                        alt="Animal's image"
                        height="120"
                        max-width="120"
                        :src="(animalPictureUrl)? animalPictureUrl : require('../../assets/catSilhuete.jpg')"
                    />


                    <v-file-input
						v-model="animalPicture"
						label="Pet's picture"
						prepend-icon="mdi-camera"
						@change="onFileChange"
						accept="image/*"
					/>
                </v-row>

                <v-row >
                    <form style="width:100%">
                        <v-text-field
                            label="Name"
                            required
                            v-model="name"
                        />
                        <v-text-field
                            label="Animal type"
                            required
                            v-model="type"
                        />
                        <v-text-field
                            label="Age"
                            required
                            v-model="age"
                        />
                        <v-text-field
                            label="Weight"
                            required
                            v-model="weight"
                        />
                        <v-textarea
                            label="Short description"
                            required
                            v-model="description"
                        />
                         <v-btn class="mr-4" color="primary" outlined @click="addAnimal()"> Add animal</v-btn>
                    </form>
                </v-row>

            </v-col>
            <v-col  md="8" lg="8">
                <v-row align="center">
                    <v-col></v-col>
                    <v-col><b>Type</b></v-col>
                    <v-col><b>Name</b></v-col>
                    <v-col><b>Age</b></v-col>
                    <v-col><b>Weight</b></v-col>
                    <v-col></v-col>
                </v-row>
                <v-virtual-scroll
                    height="600"
                    item-height="100"
                    :items="animals"
                >
                    <template v-slot:default="{ item,index }">
                        <v-list-item :key="index">
                             <v-row class="grayBorder" align="center">
                                <v-col>
                                    <v-img
                                        class="img-circle img-animated" 
                                        alt="Animal's image"
                                        max-height="60"
                                        max-width="60"
                                        :src="(item.pictureUrl)? item.pictureUrl : require('../../assets/catSilhuete.jpg')"
                                    />
                                </v-col>
                                <v-col>{{item.type}}</v-col>
                                <v-col>{{item.name}}</v-col>
                                <v-col>{{item.age}} years</v-col>
                                <v-col>{{item.weight}} kg</v-col>
                                <v-col>
                                    <v-btn color="error" @click="removeAnimal(item)">X</v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </template>
                </v-virtual-scroll> 
            </v-col>
        </v-row>
        <v-row>
            <v-col  md="1" offset-md="11">
                <router-link
                    :to="{ name:'PostJob2', params: {animals: JSON.stringify(this.animals)}}"
                    style="text-decoration: none; color: inherit"
                >
                    <v-btn class="mr-4" color="primary">Next</v-btn>
                </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            animals: [],
            name: "",
            type: "",
            age: "",
            weight: "",
            description: "",
            animalPicture: null,
            animalPictureUrl:"",
        }),
        methods:{
            async addAnimal() {
                try {
                    const animal = {
                        owner: this.$store.getters.user._id,
                        name: this.name,
                        type: this.type,
                        age: this.age,
                        weight: this.age,
                        description: this.description,
                        serviceDescription: '',
                        picture: this.animalPicture,
                        pictureUrl: this.animalPictureUrl,
                    }
                    this.animals.push(animal)
                } catch (err) {
                    console.error(err)
                }
            },

            removeAnimal(item) {
                try{
                    const index = this.animals.indexOf(item);
                    if (index > -1) {
                    this.animals.splice(index, 1);
                    }
                } catch (err){
                    console.log(err)
                }
            },
            onFileChange(file) {
                if (!file) {
                    this.animalPictureUrl = "";
                } else {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.animalPictureUrl = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
		},
        }
    };
</script>

<style>
    .img-circle {
        border-radius: 50%;
    }
    .img-animated {
        transition: all .15s ease-in-out;
    }
    .grayBorder {
        background-color: #F0F2EF;
        border-radius: 10px;
        margin: 10px;
    }
</style>