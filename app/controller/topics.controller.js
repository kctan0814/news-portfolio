const { selectTopics } = require("../model/topics.model")

exports.getTopics = (_, res) => {
  selectTopics().then((topics) =>
    res.status(200).send({topics})  
  )
}