import conf from "../conf/conf";
import { Client, Storage, ID, TablesDB, Query } from "appwrite";

export class Service {
  client = new Client();
  tablesDb;
  storage;

  constructor() {
    this.client.setEndpoint(conf.endpoint).setProject(conf.projectId);
    this.tablesDb = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDb.createRow({
        tablesDb: conf.tabeldb,
        tabelId: conf.tabelid,
        rowId: ID.unique(),
        data: {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDb.updateRow({
        tablesDb: conf.tabeldb,
        tableId: conf.tabelid,
        rowId: slug,
        data: {
          title,
          content,
          slug,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(rowId = slug) {
    try {
      return await this.tablesDb.deleteRow({
        databaseId: conf.tabeldb,
        tableId: conf.tabelid,
        rowId: slug,
        data: {
          slug,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.tablesDb.getRow({
        databaseId: conf.tabeldb,
        tableId: conf.tabelid,
        rowId: slug,
        data: {
          slug,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDb.listRows({
        databaseId: conf.tabeldb,
        tabelId: conf.tabelid,
        queries,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //File Upload Service

  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.bucketId,
        fileId: ID.unique(),
        file,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile({
        bucketId: conf.bucketId,
        fileId: ID.unique(),
        fileId,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
      se;
    }
  }
  getFilePreview(fileId) {
    return this.storage.getFilePreview({
      bucketId: conf.bucketId,
      fileId,
    });
  }
}

const service = new Service();

export default service;
