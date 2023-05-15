class ApiFeatures {

	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	search() {
		const keyword = this.queryStr.keyword
			? {
				name: {
					$regex: this.queryStr.keyword,
					$options: "i",
				},
			}
			: {};
		this.query = this.query.find({ ...keyword });
		return this;
	}

	shopByBrand() {
		// let removeForBrands = ["keyword", "health", "page", "limit"]
		// removeForBrands.forEach((field) => delete this.queryStr[field]);
		const brand = this.queryStr.brand
			? {
				categoryOne: {
					$regex: this.queryStr.brand,
					$options: "i",
				},
			}
			: {};
		this.query = this.query.find({ ...brand });
		return this;
		// const brand = this.queryStr.brand;
		// const removeFields = ["keyword", "health", "page", "limit"];
		// removeFields.forEach((field) => delete this.queryStr[field]);
		// if (brand) {
		// 	this.query = this.query.find({
		// 		categoryOne: {
		// 			$regex: brand,
		// 			$options: "i",
		// 		},
		// 	});
		// } else {
		// 	this.query = this.query.find({});
		// }
	}

	shopByHealth() {
		// let removeForHealth = ["keyword", "brand", "page", "limit"];
		// removeForHealth.forEach((field) => delete this.queryStr[field]);
		const health = this.queryStr.health
			? {
				categoryTwo: {
					$regex: this.queryStr.health,
					$options: "i",
				},
			}
			: {};
		this.query = this.query.find({ ...health });
		return this;
	}

	pagination(resultPerPage) {
		const currentPage = Number(this.queryStr.page) || 1;
		const skip = resultPerPage * (currentPage - 1);
		this.query = this.query.limit(resultPerPage).skip(skip);
		return this;
	}

};

module.exports = ApiFeatures;
