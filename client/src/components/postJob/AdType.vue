<template>
	<v-container fluid >
        <h1>Izberite tip oglasa</h1>
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
                                    <b-card-body class="cardTitle" title="Potrebujete varstvo?">
                                        <b-card-text class="text">
                                            Potrebujete nekoga, ki bo skrbel za vašega ljubljenčka, medtem ko boste odsotni.
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
                                    <b-card-body class="cardTitle" style="word-break: break-word" title="Nudite storitve?">
                                    <b-card-text class="text">
                                        Ste radi v stiku z živalmi, in vam ni težko očistiti akvarij, ter bi s tem tudi kaj zaslužili.
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
