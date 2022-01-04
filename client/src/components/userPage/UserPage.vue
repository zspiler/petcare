<template>
	<v-container fluid style="height: 100%">
		<v-img height="210px" src="../../assets/userPageBackground.png"></v-img>

		<v-row justify="space-around" style="height: 70%" class="pt-10">
			<v-col cols="6" md="2" align="center">
				<v-img
					style="margin-top: -200px; margin-bottom: 72px"
					class="img-circle"
					alt="profilka.."
					max-height="130"
					max-width="130"
					:src="getProfilePicUrl()"
				></v-img>
				<v-container class="border-container">
					<v-row align="center" class="menu-row">
						<v-btn
							color="primary"
							class="menu-btn"
							:outlined="menuTab != 'about'"
							@click="menuButtonClick('about')"
							>About you</v-btn
						>
					</v-row>
					<v-row align="center" class="menu-row">
						<v-btn
							color="primary"
							class="menu-btn"
							:outlined="menuTab != 'gallery'"
							@click="menuButtonClick('gallery')"
							>Gallery</v-btn
						>
					</v-row>
					<v-row align="center" class="menu-row">
						<v-btn
							color="primary"
							class="menu-btn"
							:outlined="menuTab != 'adsAndRequests'"
							@click="menuButtonClick('adsAndRequests')"
							>{{ adsAndRequestsButtonTxt }}</v-btn
						>
					</v-row>
					<v-row align="center" class="menu-row">
						<v-btn
							color="primary"
							class="menu-btn"
							:outlined="menuTab != 'history'"
							@click="menuButtonClick('history')"
							>History</v-btn
						>
					</v-row>
					<v-row align="center" class="menu-row">
						<v-btn
							color="primary"
							class="menu-btn"
							:outlined="menuTab != 'settings'"
							@click="menuButtonClick('settings')"
							>Settings</v-btn
						>
					</v-row>
				</v-container>
			</v-col>
			<v-col cols="10" md="8" style="width: 80%">
				<v-container class="border-container">

          <AboutTab v-if="menuTab === 'about'"/>
          <GalleryTab v-if="menuTab === 'gallery'" :is-export-mode="false" />
          <AdsAndRequestsTab v-if="menuTab === 'adsAndRequests'" :offering="user.role === 'Pet sitter'" />
          <HistoryTab v-if="menuTab === 'history'" :offering="user.role === 'Pet sitter'" />
          <SettingsTab v-if="menuTab === 'settings'"/>
        </v-container>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import AboutTab from "./AboutTab";
import GalleryTab from "./GalleryTab";
import AdsAndRequestsTab from "./AdsAndRequestsTab";
import HistoryTab from "./HistoryTab";
import SettingsTab from "./SettingsTab";

export default {
	name: "UserPage",
	data: () => ({
		//tracks which tab is active to the right of the menu and which button has no outline; toggled by menu button clicks
		menuTab: "about",
	}),
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
	},
	methods: {
		getProfilePicUrl() {
			return (
				this.$store.state.serverBaseUrl + "img/" + this.$store.getters.user.profilePicture
			);
		},
		menuButtonClick(name) {
			if (name) this.menuTab = name;
		},
	},
	components: {
		AboutTab,
		GalleryTab,
		AdsAndRequestsTab,
		HistoryTab,
		SettingsTab,
	},
};
</script>

<style scoped>
.border-container {
	height: 100%;
	border-style: solid;
	border-width: 1px;
	border-color: #448aff;
	border-radius: 5px;
	/* padding-block: 30px; */
	/* padding-top: 20px; */
}
.menu-btn {
	width: 80%;
	margin-top: 5px;
}
.menu-row {
	height: 20%;
	justify-content: center;
	vertical-align: center;
}
.img-circle {
	border-radius: 50%;
}
</style>
