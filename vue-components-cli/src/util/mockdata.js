var Mock = require('mockjs')
var data = Mock.mock({
  'list|1-10': [{
     'city': '@city(true)',
     'num':'@natural()',
     'date':'@date("yyyy-MM-dd")'
   }]
})

export default data;
