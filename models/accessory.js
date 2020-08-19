const mongoose=require('mongoose')
const { ObjectID, ObjectId } = require('mongodb')


    
      const AccessoryShema=new mongoose.Schema({
          name:{
              type:String,
              required:true,
              match: [/^[A-Za-z0-9 ]+$/, 'Accessory name is not valid'],
              minlength:5
          },
          description:{
                type:String,
                required:true,
                maxlength:200,
                match: [/^[A-Za-z0-9 ]+$/, 'Accessory description is not valid'],
                minlength:20
          },
          imageUrl:{
              type:String,
              required:true
          },
          
          cubes:[{
              type:ObjectId,
              ref:'Cube'
          }]
      })

      AccessoryShema.path('imageUrl').validate(function(url){
        return url.startsWith('http://') || url.startsWith('https://')
    }, 'Image URL is not valid')

module.exports=mongoose.model('Accessory',AccessoryShema)