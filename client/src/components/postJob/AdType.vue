<template>
	<v-container fluid >
        <h1>Choose post type</h1>
        <b-row class="row">
            <b-col md="1"></b-col>
            <b-col>
                <div class="column">
                    <b-card no-body class="overflow-hidden card"  style="max-width: 650px; padding: 10px 10px 10px 15px;">
                        <router-link to="/postJob1" style="text-decoration: none; color: inherit">
                            <b-row>
                                <b-col md="6">
                                    <v-img
                                        class="image"
                                        width="500"
                                        src="../../assets/typedog.png"
                                    ></v-img> 		
                                </b-col>
                                <b-col md="6">
                                    <b-card-body class="cardTitle" title="In need of sitter?">
                                        <b-card-text class="text">
                                            You need someone, who will take care of your home pet when you are away.
                                        </b-card-text>
                                    </b-card-body>
                                </b-col>                           
                            </b-row>
                        </router-link>
                    </b-card>
                </div>
                
            
            </b-col>
            <b-col>
                <div class="column">
                    <b-card no-body class="overflow-hidden card"  style="max-width: 650px; padding: 10px 10px 10px 15px;">
                        <router-link to="/postJob/service" style="text-decoration: none; color: inherit">
                            <b-row>
                                <b-col md="6">
                                    <b-card-body class="cardTitle" style="word-break: break-word" title="Offering services?">
                                    <b-card-text class="text">
                                        Do you like animals and you don't mind cleaning up after them? Would you like to make some money?
                                    </b-card-text>
                                    </b-card-body>
                                    
                                </b-col>
                                <b-col md="6">
                                    <v-img
                                        class="image"
                                        width="500"
                                        src="../../assets/typeaquarium.png"
                                    ></v-img> 		
                                </b-col>
                            </b-row>
                        </router-link>
                    </b-card>
                </div>

            </b-col>
        </b-row>

    </v-container>

</template>

<script>
export default {};
</script>

<style scoped>

 h1{
     text-align: center;
     margin-top: 5% !important;
     font-weight: 400;
     font-size: 40px;
     margin-bottom: 1%;
 }
 .row{
     text-align: center;
 }

 .card{
     border-radius: 50px !important;
     border: none !important;
     background-color: #F0F2EF !important;
 }
.column{
     margin-top: 10%;
 }
 .text{
     margin-top: 30%;
     font-size: 18px;
     text-align: left;
 }
 .cardTitle{
    margin-top: 30px;
}
.image{
    border-radius: 50px;
}
.card-title{
    font-size: 26px;
}

</style>
