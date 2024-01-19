"use client"
import React from 'react'


const ImageForm = ({up}) => {
  return (
      <div>
          <form method="POST" action="/api/image" encType="multipart/form-data">
              <div>
                  <label>Image</label>
                  <input type='file' accept="image/*" name='image' />
                  <input type="submit"/>
              </div>
              
          </form>
    </div>
  )
}

export default ImageForm