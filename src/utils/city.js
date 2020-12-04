import CityJson from '../assets/city.json'

const resultList = [];
CityJson.forEach(item => {
    let citys = item.citys;
    let obj = {};
    obj[item.provinceName] = citys.map(item => item.citysName)
    resultList.push(obj);
})

export default resultList;