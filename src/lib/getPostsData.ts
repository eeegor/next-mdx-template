import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = "src/content";

const postsDirectory = (page: string) =>
  path.join(process.cwd(), `${CONTENT_DIR}/${page}`);
const fileExtention = ".mdx";

function getAllFilesInDirectory() {
  const fileNames = fs.readdirSync(postsDirectory("posts"));
  return fileNames.map((fileName) => path.parse(fileName));
}

function getMdxFiles() {
  const allFiles = getAllFilesInDirectory();
  return allFiles.filter((parsedFile) => parsedFile.ext === fileExtention);
}

export function getAllPostsPath() {
  const allMdxFiles = getMdxFiles();
  return allMdxFiles.map((parsedFile) => {
    return {
      params: {
        slug: parsedFile.name,
      },
    };
  });
}

export function getPostsMetaData() {
  const allMdxFiles = getMdxFiles();
  const postsMetaData = allMdxFiles.map((parsedFile) => {
    const fullPath = path.join(postsDirectory("posts"), parsedFile.base);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return { ...data, slug: parsedFile.name };
  });
  return postsMetaData;
}

export function getPostData(slug, directory = "posts") {
  const fullPath = path.join(
    postsDirectory(directory),
    `${slug}${fileExtention}`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { metadata: { ...data, slug }, content };
}
