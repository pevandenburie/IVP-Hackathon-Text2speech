module.exports = Object.freeze({
	httpListeningPort: 8090, // Port to which the server listens

	UseITK: false,

    AuthToken: '3pXKqBT8Ykn88cqfY2QLkEl6zE0c', // ITK Token, needs to be refreshed

	RefreshToken: "TODO",

	ITKHostPrefix: 'https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1',

	LocalCtap: {
		host: "http://localhost:8000/ctap/r1.3.0",
		headers: {
			"x-cisco-vcs-identity": {"cmdcDeviceType":"IOS","upId":"tonleigh_0","tenantId":"NET","solutionId":"k","sessionId":"42aa821f-3906-4ccc-8610-5c8f3ad39109","cmdcRegion":"16384~16639","hhId":"tonleigh","devId":"4FE4C75352398787","deviceFeatures":["COMPANION","IOS","ABR","WIFI-CHIP","TABLET","VG-DRM","UNMANAGED"],"community":"EXP700","tenant":"k","region":"100"}
		}
	}

});

	