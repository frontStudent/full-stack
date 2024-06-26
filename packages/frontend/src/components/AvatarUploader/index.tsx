import React, { useState } from "react";
import { Upload, Image } from "antd";
import COS from "cos-js-sdk-v5";
import ImgCrop from "antd-img-crop";
import styled from "styled-components";
const UploadArea = styled.div`
  width: 100px;
  height: 150px;
  background-color: #f5f5f5;
`;
const AvatarUploader: React.FC = ({ onMutateBox, id, child }) => {
  const [lastImageUrl, setLastImageUrl] = useState<string>(child.src || "");

  const cos = new COS({});

  return (
    <ImgCrop rotationSlider aspect={2 / 3}>
      <Upload
        disabled={!!lastImageUrl}
        customRequest={({ file, onSuccess }) => {
          cos.putObject(
            {
              Bucket: "test001-1321884130" /* 填入您自己的存储桶，必须字段 */,
              Region:
                "ap-nanjing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
              Key:
                new Date().getTime() +
                "xx.jpg" /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
              Body: file /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */,
              // onProgress: function (progressData) {
              //   console.log(JSON.stringify(progressData));
              // },
            },
            function (err, data) {
              if (err) {
                console.log(err);
                return;
              }
              let url = "https://" + data.Location;
              setLastImageUrl(url);
              onMutateBox?.(id, { ...child, src: url }, "update");
              onSuccess?.(data);
            }
          );
        }}
        showUploadList={false}
      >
        {lastImageUrl ? (
          <Image
            src={lastImageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
            preview={false}
          />
        ) : (
          <UploadArea>upload</UploadArea>
        )}
      </Upload>
    </ImgCrop>
  );
};

export default AvatarUploader;
