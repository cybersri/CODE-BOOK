
const {validateText, filterPaper} = require('filter-paper')

exports.suggestionVal = (req, res, next) =>{
    try {
        let { title, description, code } = req.body
        title= validateText({
            value:title,
            name:'title',
            min:5,
            max:40
        });
        description = validateText({
            value: description,
            name: 'description',
            min:5,
            max:255
        })
        code = validateText({
            value:code,
            name:'code',
            min:7,
            max:100000
        })
        const filtered = filterPaper({title,description,code})

        if(filtered.isValid){
            res.body.title = filtered.data.title
            res.body.description = filtered.data.description
            res.body.code = filtered.data.code
            next()
        }
        else{
            return res.status(401).json({
                err:filtered.err
            })
        }

        }
     catch (error) {
        return res.status(401).json({
            msg:'something went wrong',
            error
        })
    }
}