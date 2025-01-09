/* eslint-disable @next/next/no-img-element */
'use client';

import {FieldLabel, useField} from '@payloadcms/ui';
import {UploadApiResponse} from 'cloudinary';
import React, {Fragment, useRef, useState} from 'react';
import {CloudinaryObject, CloudinaryPluginConfig} from './plugin';

export type CustomCloudinaryFieldProps = {
  cloudinaryPluginConfig: CloudinaryPluginConfig;
  private?: boolean;
  mimeTypes?: string[];
  collection: string;
};

export const getCloudinaryObject = (
  file: File,
  uploadResponse: UploadApiResponse,
  cloudinaryPluginConfig: CloudinaryPluginConfig
): CloudinaryObject => ({
  fileName: file.name,
  publicId: uploadResponse.public_id,
  format: uploadResponse.format,
  version: `v${uploadResponse.version}`,
  type: uploadResponse.type,
  cloudName: cloudinaryPluginConfig.cloudName || '',
  resourceType: uploadResponse.resource_type,
  url: uploadResponse.secure_url,
  fileSize: uploadResponse.bytes,
  width: uploadResponse.width,
  height: uploadResponse.height,
});

const CloudinaryUpload: React.FC<{path: string} & {field: {admin: {custom: CustomCloudinaryFieldProps}}}> = ({
  path,
  field,
}) => {
  const [fileObject, setFileObject] = useState<{file: File; preview: string; uploading: true} | undefined>(undefined);

  const ref = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number, decimals: number = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const {setValue, value} = useField<CloudinaryObject>({path});

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return setFileObject(undefined);
    setFileObject({file, preview: URL.createObjectURL(file), uploading: true});

    try {
      const timestamp = Math.round(new Date().getTime() / 1000).toString();

      const signatureFormData = new FormData();
      signatureFormData.set('timestamp', timestamp);
      signatureFormData.set('folder', field.admin.custom.cloudinaryPluginConfig.uploadFolder);
      if (field.admin.custom.private) signatureFormData.append('type', 'private');

      const signatureResult = await fetch(`/api/${field.admin.custom.collection}/generate-signature`, {
        method: 'POST',
        body: signatureFormData,
      });
      const {signature} = await signatureResult.json();

      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('timestamp', timestamp);
      uploadFormData.append('api_key', field.admin.custom.cloudinaryPluginConfig.apiKey);
      uploadFormData.append('signature', signature);
      uploadFormData.append('folder', field.admin.custom.cloudinaryPluginConfig.uploadFolder);
      if (field.admin.custom.private) uploadFormData.append('type', 'private');

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${field.admin.custom.cloudinaryPluginConfig.cloudName}/upload`,
        {
          method: 'POST',
          body: uploadFormData,
        }
      );

      const uploadResponseJson = await uploadResponse.json();
      const cloudinaryObject = getCloudinaryObject(file, uploadResponseJson, field.admin.custom.cloudinaryPluginConfig);
      setValue(cloudinaryObject);
      setFileObject(undefined);
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setFileObject(undefined);
    }
  };
  return (
    <div className='field-type image'>
      <FieldLabel label='Upload*' />
      {!value && (
        <Fragment>
          <input
            hidden
            type='file'
            accept={field.admin.custom.mimeTypes?.join(',')}
            onChange={(e) => handleUpload(e)}
            ref={ref}
          />
          {!fileObject && (
            <button
              onClick={() => ref.current?.click()}
              style={{
                width: '200px',
                height: '150px',
                backgroundColor: '#f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='32px' height='32px'>
                <path d='M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z' />
              </svg>
            </button>
          )}
          {fileObject && (
            <div
              style={{
                width: '200px',
                height: '150px',
                position: 'relative',
              }}>
              <img
                src={fileObject.preview}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                alt=''
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}>
                <svg
                  style={{
                    width: '32px',
                    height: '32px',
                    animation: 'spin 1s linear infinite',
                  }}
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='blue'
                  />
                </svg>
              </div>
            </div>
          )}
        </Fragment>
      )}
      {value && (
        <div style={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
          {value.url && value.format !== 'pdf' && (
            <a target='_blank' rel='noreferrer' href={value.url}>
              <img
                src={value.url}
                style={{
                  width: '200px',
                  height: '150px',
                  objectFit: 'contain',
                  objectPosition: 'left',
                }}
                alt=''
              />
            </a>
          )}
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {value.fileName && (
              <a target='_blank' rel='noreferrer' href={value.url}>
                <b>{value.fileName}</b>
              </a>
            )}
            <div style={{display: 'flex', flexDirection: 'row', gap: '24px'}}>
              {value.resourceType && value.format && (
                <div>
                  {value.resourceType}/{value.format}
                </div>
              )}
              {value.height && value.width && value.format !== 'pdf' && (
                <div>
                  {value.width}px x {value.height}px
                </div>
              )}
              {value.fileSize && <div>{formatBytes(value.fileSize)}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
