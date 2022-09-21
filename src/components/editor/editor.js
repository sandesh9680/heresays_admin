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
          height: 500,
          selector: 'textarea#file-picker',
          resize: false,
          resize_img_proportional: false,
          menubar: true,
          automatic_uploads: true,
          file_picker_types: 'image',
          image_title: true,
          toolbar_mode: 'wrap',
          statusbar: false,
          table_use_colgroups: false,
          plugins:
            [
              'image',
              'casechange',
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
              'wordcount'

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
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}

      >
      </Editor>

    </>
  );
}