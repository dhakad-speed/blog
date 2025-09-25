const conf = {
  endpoint: String(import.meta.env.VITE_APPWRITE_URL),
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  tabeldb: String(import.meta.env.VITE_APPWRITE_TABLE_DB_ID),
  tabelid: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
  bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};
// console.log(conf);

export default conf;
