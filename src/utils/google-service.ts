import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "./housemade-4bacc34cdffd.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

export type UploadFileParam = {
  fileName: string;
  folderId: string;
  fileData: string;
};

export const uploadFile = async (file: UploadFileParam) => {
  try {
    const drive = google.drive({ version: "v3", auth });

    const result = await drive.files.create({
      // resource: {
      //   name: meta.name,
      //   parents: [file.folderId],
      // },
      requestBody: {
        name: file.fileName,
        mimeType: "text/plain",
      },
      media: {
        mimeType: "text/plain",
        body: file.fileData,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

type GetFile = {
  id: string;
  folderId: string;
};

export const getFile = async ({ id, folderId }: GetFile) => {
  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.get(
    { fileId: id, alt: "media" },
    { responseType: "text" }
  );
  return res.data as string;
};

export const getMultipleFile = async () => {
  const drive = google.drive({ version: "v3", auth });

  await drive.files.list(
    // { alt: "media", },
    // { responseType: "arraybuffer" },
    (err, res) => {
      if (err && !res) {
        console.log(">>>>> get multitple errro", err);
        throw err;
      }

      if (res) {
        const imageType = res.headers["content-type"];

        console.log("res.data___________________", res.data);
      }
    }
  );
};

export const getDeleteFile = async ({ id }: { id: string }) => {
  const drive = google.drive({ version: "v3", auth });

  if (id) {
    await drive.files.delete({ fileId: id });
  }
};

export const getDeleteFiles = async () => {
  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.list();
  res.data.files?.map(async (file) => {
    if (file.id) {
      await drive.files
        .delete({ fileId: file.id })
        .then((res) => console.log(res))
        .catch((er) => console.log(er.message));
    }
  });
};
