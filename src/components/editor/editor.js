import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Card, Grid, TextField } from '@mui/material';


export default function RichEditor(props) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
    }
  };
  return (
    <>
      <Editor
        id="file-picker"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={props.editorDefaultText}
        onEditorChange={props.handleUpdate}
        init={{
          apiKey: 'rtegbgbdp35gkn2f2srqxvgdlzxd5koysugkvk7rq4u4m7on',
          // tinydrive_token_provider: 'http://localhost:3000/api/jwt',
          images_upload_handler: function () { },
          // jwt_token: jwtToken,
          height: 500,
          selector: 'textarea#file-picker',
          resize: false,
          resize_img_proportional: false,
          menubar: true,
          images_upload_url: false,
          // automatic_uploads: true,
          file_picker_types: 'image',
          image_title: true,
          toolbar_mode: 'wrap',
          statusbar: false,
          table_use_colgroups: false,
          default_link_target: '_blank',
          plugins:
            [
              'image',
              'advlist  autolink lists link image charmap print preview',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
              'tinydrive',
              'anchor',
              'emoticons',
              'insertdatetime',
              'lists',
              'media',
              'searchreplace',
              'table',
              'wordcount',
              'link'

            ],
          file_picker_callback: (cb, value, meta) => {
            let input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.setAttribute('id', 'fileInput');
            input.addEventListener('change', (e) => {
              const file = e.target.files[0];

              const reader = new FileReader();
              reader.addEventListener('load', () => {
                const id = 'blobid' + (new Date()).getTime();
                const blobCache = editorRef.current.editorUpload.blobCache;
                const base64 = reader.result.split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                cb(blobInfo.blobUri(), { title: file.name });
              });
              reader.readAsDataURL(file);
            });
            input.click();
          },

          toolbar: 'fontfamily fontsize lineheight | forecolor backcolor | bold italic emoticons | alignleft aligncenter alignright alignjustify | undo redo | formatselect | link image | code | insertdatetime | numlist bullist | searchreplace | removeformat' +
            'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol' +
            ' | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          setup: function (editor) {
            // Add a custom event handler for before sending HTTP requests
            // editor.on('BeforeHttp', function (e) {
            //   // Check if the request is to the TinyMCE file manager
            //   if (e.target.url.includes('https://catalog.tiny.cloud')) {
            //     // Add the required headers
            //     e.target.headers['Origin'] = 'https://localhost:3001'; // Replace with your application's domain
            //   }
            // });
            editor.on('BeforeSetContent', function (e) {
              // Insert a new paragraph before inserting an image
              if (e.content.indexOf('<img') !== -1) {
                e.content = '<p></p>' + e.content;
              }
            });
          }
        }}

      >
      </Editor>

    </>
  );
}