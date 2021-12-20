<template>
	<v-container fill-height  >
        <v-row justify="center">
            <v-col  md="5" lg="5" class="grayBorder" align="center">
                <h1>About me</h1>
                    <p>About me:</p>
                    <v-row>
                        <v-col>
                            <v-textarea class="inputField"
                            />
                        </v-col>
                    </v-row>
                    <p>My experience:</p>
                    <v-row>
                        <v-col>
                            <v-textarea class="inputField"
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
                                    :value="[[user.firstName]]"                    
                                    />
                                </span>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    required
                                    class="inputFieldSmall"
                                    :value="[[user.lastName]]"
                                />
                            </v-col>
                        </v-row>
                        <p>Animals that I am willing to sit:</p>
                        <div class="animals" :items="items">
                            <v-row v-for="i in 3" v-bind:key="i">
                                <v-col v-for="j in 4" v-bind:key="j">
                                    <label for="checkbox">
                                        <input type="checkbox" id="checkbox" />
                                        {{items[0].animal}}
                                    </label>
                                </v-col>
                            </v-row>
                        </div>
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
                                        v-model="date"
                                        label="Date from"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="date"
                                    @input="menu1 = false"
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
                                            v-model="date"
                                            label="Date to"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="date"
                                        @input="menu2 = false"
                                        ></v-date-picker>
                                    </v-menu>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    required
                                    class="inputFieldSmall"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                        </v-row>
                        <p>Total: <b>150 €</b></p>
                         <v-btn class="mr-4" color="primary" outlined>Post job</v-btn>
                    </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    computed: {
		user() {
			return this.$store.getters.user;
        }
    },
    data: () => ({
      items: [
        {animal: 'Cat'},
        {animal: 'Dog'},
        {animal: 'Hamster'},
        {animal: 'Turtle'},
        {animal: 'Fish'},
        {animal: 'Parrot'},
        {animal: 'Reptile'},
        {animal: 'Rabbit'},
        {animal: 'Dinosaur'},
        {animal: 'Other mammal'},
        {animal: 'Other bird'},
        {animal: 'Other'},
      ],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }),
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