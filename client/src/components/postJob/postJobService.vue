<template>
	<v-container fill-height  >
        <v-row justify="center">
            <v-col  md="5" lg="5" class="grayBorder" align="center">
                <h1>About me</h1>
                    <p>About me:</p>
                    <v-row>
                        <v-col>
                            <v-textarea class="inputField"
                                        v-model="aboutMe"
                            />
                        </v-col>
                    </v-row>
                    <p>My experience:</p>
                    <v-row>
                        <v-col>
                            <v-textarea class="inputField"
                                        v-model="experience"
                            />
                        </v-col>
                    </v-row>
            </v-col>

            <v-col  md="6" lg="6" class="grayBorder" align="center">
                <h1>User data</h1>
                    <form>
                        <p>Check if your data is correct.</p>
                        <v-row>
                            <v-col>
                                <span>
                                <v-text-field
                                    required
                                    class="inputFieldSmall"      
                                    v-model="name"                   
                                    />
                                </span>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    required
                                    class="inputFieldSmall"
                                    v-model="surname"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="City"
                                    required
                                    v-model="city"
                                />
                            </v-col>
                        </v-row>
                        <p>Animals that I am willing to sit:</p>
                        <v-row  justify="center">
                            <v-col md="10">
                                <v-combobox
                                    v-model="select"
                                    :items="items"
                                    label="Type of animals"
                                    multiple
                                    outlined
                                    dense
                                ></v-combobox>
                            </v-col>
                        </v-row>
                        <v-row style="margin-bottom: -30px;">
                            <v-col style="text-align:left; margin-left: 5px; font-size: 14px;">
                                I offer service
                            </v-col>
                            <v-col style="text-align:center;font-size: 14px;">
                                Cost per day
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-menu
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="dateFrom"
                                        label="Date from"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="dateFrom"
                                        @input="dateInputFrom = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col>
                                <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="dateTo"
                                            label="Date to"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="dateTo"
                                            @input="dateInputTo = false"
                                        ></v-date-picker>
                                    </v-menu>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    required
                                    class="inputFieldSmall"
                                    v-model="price"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                        </v-row>
                        <p>Total: <b>{{this.calculatedPrice}} €</b></p>
                         <v-btn class="mr-4" color="primary" outlined @click="postService()">Post job</v-btn>
                    </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  import axios from "axios";
  export default {
    computed: {
		user() {
			return this.$store.getters.user;
        }
    },
   data: () => ({
        url: 'http://localhost:5000/api/',
        name: '',
        surname: '',
        city: '',
        aboutMe: '',
        experience:'',
        price: 0,
        calculatedPrice: 0,
        animals: [],
        dateFrom: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateTo: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateInputFrom: false,
        dateInputTo: false,
        selected:[],
        items: [
            'Cat',
            'Dog',
            'Hamster',
            'Turtle',
            'Fish',
            'Parrot',
            'Reptile',
            'Rabbit',
            'Dinosaur',
            'Other mammal',
            'Other bird',
            'Other',
        ],
    }),
    async created() {
        this.name = this.$store.getters.user.firstName
        this.surname = this.$store.getters.user.lastName
        this.city = this.$store.getters.user.city
    },
    watch:{
        'dateFrom':{
            handler: function() {
                this.calculatedPrice = this.price * this.dateDiff()
            },
        },
        'dateTo':{
            handler: function() {
                this.calculatedPrice = this.price * this.dateDiff()
            },
        },
        'price':{
            handler: function() {
                this.calculatedPrice = this.price * this.dateDiff()
            },
        }
    },
    methods:{
        async postService() {
            try {
                const data = {
                    userId: this.$store.getters.user._id,
                    dateFrom: this.dateFrom,
                    dateTo: this.dateTo,
                    pricePerDay: Number(this.price),
                    type: 'serviceOffering',
                    animalsType: this.selected,
                    aboutMe: this.aboutMe,
                    experience: this.experience
                }
                await axios.post(`${this.url}service/offer`,data)
            
            } catch (err) {
                console.error(err)
            }
		},
        dateDiff(){
            var Difference_In_Time = new Date(this.dateTo).getTime() - new Date(this.dateFrom).getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            return Difference_In_Days
        }
    },
  }
</script>

<style scoped>
    h1{
        margin-bottom: 40px;
    }
    .img-circle {
        border-radius: 50%;
    }
    .img-animated {
        transition: all .15s ease-in-out;
    }
    .grayBorder {
        background-color: #F0F2EF;
        border-radius: 40px;
    }
    /*
    .inputField{
        background-color: #fff;
        border-radius: 40px;    
        padding: 20px;
        box-shadow: 2px 2px #dedede;
        margin: 0% 4% 20% 4%;
    }
    .inputFieldSmall{
        background-color: #fff;
        border-radius: 30px;    
        box-shadow: 2px 2px #dedede;
        margin-bottom: 40px;
        padding-left: 20px;
    }
    
    .custom.inputField.v-text-field > .v-input__control > .v-input__slot:before{
        border-style: none !important;
    }
    .custom.inputField.v-text-field > .v-input__control > .v-input__slot:after{
        border-style: none !important;
    }
    */
    .animals{
        margin-bottom: 5%;
    }
</style>