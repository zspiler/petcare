<template>
    <v-row justify="center" class="userRow">

		<v-col  md="2" align="center">
			<v-img
				src="../../assets/profile_default.png"
				width=80
			>
			</v-img>
		</v-col>
		<v-col  md="2" align="center" class="top">
			<b><p>Ime Iskalca</p></b>
		</v-col>
		<v-col  md="2" align="center" class="top">
			<b><p>Ime Iskalca</p></b>
		</v-col>
		<v-col  md="2" align="center" class="top">
			<b><p>Žival</p></b>
		</v-col>
		<v-col  md="2" align="center" class="top">
			<b><p>Od/Do</p></b>
		</v-col>
	</v-row>
</template>
<script>
export default {

}
</script>
<style scoped>
	.userRow{
		height: 100px;
		background-color: #F0F2EF;
		border-radius: 10px;
		margin: 0% 15% 0% 15%;
		box-shadow: 2px 2px #dedede;
	}
	.top{
		padding-top: 40px;
	}
</style>
