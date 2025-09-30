const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://valo:${password}@cluster0.iwaadsv.mongodb.net/testiBlogilista?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url).then(() => {
  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
  });

  const Blog = mongoose.model("Blog", blogSchema);

  const blog = new Blog({
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  });

  blog.save().then((result) => {
    console.log("blog saved!");
    mongoose.connection.close();
  });

  const blog2 = new Blog({
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  });

  blog2.save().then((result) => {
    console.log("blog2 saved!");
    mongoose.connection.close();
  });

  /*Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })*/
});
