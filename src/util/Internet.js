import { get_args } from './Helpers';
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
// const dns = require('dns');

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));


export const resolve_request = (url, data=null, sid=null) => {
	return new Promise((resolve, reject) => {
		if (data) {
			data = JSON.stringify(data);
		}
		client.request(url, get_args(data, sid))
				.then((json) => resolve(json))
			.catch((rej) => {
				reject(rej);
			});
	})
}

//local methods
// const check_if_domain_exists = (domain) => {
// 	return new Promise((resolve, reject) => {
// 		dns.resolve('www.google.com', (e) => {
// 			if (e)
// 				reject(e);
// 			else
// 				resolve()
// 		})
// 	});
// }

// const fetch_url = (domain, url, data, sid) => {
// 	return new Promise((resolve, reject) => {
// 		//first check if connection exists
// 		check_if_domain_exists(domain)
// 			.then(() => {
// 				agent.request(url, get_args(data, sid))
// 				.then((res) => {
// 					resolve(res);
// 				});
// 			}).catch((rej) => {
// 				reject(rej)
// 			});
// 	})
// }