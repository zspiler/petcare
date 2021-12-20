<template>
	<v-container fill-height >
        <v-row justify="center" >
            <v-col  md="5" lg="5">

                <h1>Add animal</h1>

                <v-row align="center" style="margin-top: 10px">
                    <v-img
                            class="img-circle img-animated" 
                            alt="Animal's image"
                            height="120"
                            max-width="120"
                            src="../../assets/mucekPupa.png"
                        />
                    <v-btn class="mr-4" color="primary" outlined> Add image</v-btn>
                </v-row>

                <v-row>
                    <form>
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
                            label="Oldnes"
                            required
                            v-model="oldness"
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
            <v-col  md="7" lg="7">
                <v-row align="center">
                    <v-col></v-col>
                    <v-col><b>Type</b></v-col>
                    <v-col><b>Name</b></v-col>
                    <v-col><b>Age</b></v-col>
                    <v-col><b>Weight</b></v-col>
                    <v-col></v-col>
                </v-row>
                <v-row class="grayBorder" align="center">
                    <v-col>
                        <v-img
                            class="img-circle img-animated" 
                            alt="Animal's image"
                            max-height="60"
                            max-width="60"
                            src="../../assets/mucekPupa.png"
                        />
                    </v-col>
                    <v-col>Mucek</v-col>
                    <v-col>Pupa</v-col>
                    <v-col>2 leti</v-col>
                    <v-col>1.5 kg</v-col>
                    <v-col>
                        <v-btn color="error">X</v-btn>
                    </v-col>
                </v-row>
                <v-row class="grayBorder" align="center">
                    <v-col>
                        <v-img
                            class="img-circle img-animated" 
                            alt="Animal's image"
                            max-height="60"
                            max-width="60"
                            src="../../assets/mucekPupa.png"
                        />
                    </v-col>
                    <v-col>Mucek</v-col>
                    <v-col>Pupa</v-col>
                    <v-col>2 leti</v-col>
                    <v-col>1.5 kg</v-col>
                    <v-col>
                        <v-btn color="error">X</v-btn>
                    </v-col>
                </v-row>
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
            oldness: "",
            weight: "",
            description: "",
        }),
        methods:{
            async addAnimal() {
                try {
                    console.log(this.$store.getters.user._id)
                    const animal = {
                        owner: this.$store.getters.user._id,
                        name: this.name,
                        type: this.type,
                        oldness: this.oldness,
                        weight: this.oldness,
                        description: this.description,
                    }
                    this.animals.push(animal)
                } catch (err) {
                    console.error(err)
                }
            }
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