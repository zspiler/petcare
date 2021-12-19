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
                        />
                        <v-text-field
                            label="Animal type"
                            required
                        />
                        <v-text-field
                            label="Oldnes"
                            required
                        />
                        <v-text-field
                            label="Weight"
                            required
                        />
                        <v-textarea
                            label="Short description"
                            required
                        />
                         <v-btn class="mr-4" color="primary" outlined> Add animal</v-btn>
                    </form>
                </v-row>

            </v-col>
            <v-col  md="7" lg="7">
                <v-row align="center">
                    <v-col></v-col>
                    <v-col><b>Type</b></v-col>
                    <v-col><b>Name</b></v-col>
                    <v-col><b>Oldness</b></v-col>
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
                    to="/postJob2"
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