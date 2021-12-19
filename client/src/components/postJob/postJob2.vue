<template>
	<v-container fill-height  >
        <v-row justify="center">
            <v-col  md="6" lg="6" class="grayBorder" align="center">

                <h1>Animal needs</h1>
                <v-virtual-scroll
                    :bench="benched"
                    height="480"
                    item-height="150"
                    :items="items"
                >
                    <template v-slot:default="{ item }">
                    <v-list-item :key="item">
                        <v-row>
                            <v-col md="4">
                                <v-img
                                    class="img-circle img-animated" 
                                    alt="Animal's image"
                                    height="100"
                                    max-width="100"
                                    src="../../assets/mucekPupa.png"
                                />
                            </v-col>
                            <v-col md="8">
                                <v-textarea
                                    v-model="item.title"
                                    height=100
                                />
                            </v-col>
                        </v-row>
                        </v-list-item>
                    </template>
                </v-virtual-scroll>     
            </v-col>
            <v-col  md="5" lg="5" class="grayBorder" align="center">
                <h1>User data</h1>
                    <form>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Name"
                                    required
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    label="Surname"
                                    required
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Address"
                                    required
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="City"
                                    required
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    label="Post number"
                                    required
                                />
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
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Price per day"
                                    required
                                />
                            </v-col>
                            <v-col>
                                <p><b>150</b></p>
                            </v-col>
                        </v-row>
                        
                         <v-btn class="mr-4" color="primary" outlined>Post job</v-btn>
                    </form>
            </v-col>
        </v-row>
        <v-row justify="center" align="center">
            <v-col  md="1" offset-md="11">
                <router-link
                    to="/postJob3"
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
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
    }),
  }
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
        border-radius: 20px;
    }
</style>