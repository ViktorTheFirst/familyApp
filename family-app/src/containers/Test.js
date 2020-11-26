import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class Test extends React.Component {
  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };

  render() {
    return (
      <Editor
        initialValue=''
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'image advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          file_picker_callback: function (cb, value, meta) {
            let input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = function () {
              let file = this.files[0];
              let reader = new FileReader();
              let myURL = URL.createObjectURL(this.files[0]);
              reader.onload = function () {
                cb(myURL, { title: file.name, height: 'auto' });
              };
              reader.readAsDataURL(file);
            };
            input.click();
          },
          file_picker_types: 'image',
          image_title: true,
          automatic_uploads: true,
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default Test;
