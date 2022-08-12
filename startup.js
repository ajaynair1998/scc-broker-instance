let fs = require("fs");

const https = require("https");
const callback = function (err, ip) {
	if (err) {
		return console.log(err);
	}

	console.log("Our public IP is", ip);
	fs.writeFile(
		"./test-server/src/ip.json",
		JSON.stringify({
			ip: ip,
		}),
		(err) => {
			console.log(err);
		}
	);
	fs.writeFile(
		"./scc-broker/ip.json",
		JSON.stringify({
			ip: ip,
		}),
		(err) => {
			console.log(err);
		}
	);
	return ip;
	// do something here with the IP address
};

const getPublicIp = () => {
	let final;
	https.get(
		{
			host: "api.ipify.org",
		},
		function (response) {
			var ip = "";
			response.on("data", function (d) {
				ip += d;
			});
			response.on("end", function () {
				if (ip) {
					callback(null, ip);
					final = ip;
				} else {
					callback("could not get public ip address :(");
				}
			});
		}
	);
	return final;
};
getPublicIp();
