module.exports = Object.freeze({
	httpListeningPort: 8090, // Port to which the server listens

	httpHost: "http://52.91.99.14", // Change to external host where this is deployed

	UseITK: false,

	AuthUrl: "https://cloudsso.cisco.com/as/token.oauth2?grant_type=client_credentials&client_id=462747c98b7746de8f1a3d38317c6b99&client_secret=572ebe4c956648d28DE89EAF25E4BE83",

    AuthToken: '3pXKqBT8Ykn88cqfY2QLkEl6zE0c', // ITK Token, needs to be refreshed

	RefreshToken: "TODO",

	ITKHostPrefix: 'https://apx.cisco.com/spvss/infinitehome/ivptoolkit/hackathon',

	LocalCtap: {
		host: "http://localhost:8000/ctap/r1.3.0",
		headers: {
			"x-cisco-vcs-identity": {"cmdcDeviceType":"IOS","upId":"tonleigh_0","tenantId":"NET","solutionId":"k","sessionId":"42aa821f-3906-4ccc-8610-5c8f3ad39109","cmdcRegion":"16384~16639","hhId":"exp705","devId":"4FE4C75352398787","deviceFeatures":["COMPANION","IOS","ABR","WIFI-CHIP","TABLET","VG-DRM","UNMANAGED"],"community":"EXP705","tenant":"k","region":"100"}
		}
	}

});
