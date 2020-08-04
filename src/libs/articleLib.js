export default function makePretty(articles, maxLength = 500) {
  const newData = articles.data.map((post) => {
    var p = post;
    if (p.post_excerpt === "") {
      var excerpt = p.post_content.trim().split("\n")[0];
      var i = 0;
      while (hasImage(excerpt) != null || excerpt.length < 10) {
        i++;

        excerpt = p.post_content.trim().split("\n")[i];
        if (excerpt === undefined) {
          excerpt = "";
          break;
        }
      }
      i = 0;
      while (excerptJunk(excerpt)) {
        i++;
        excerpt = p.post_content.trim().split("\n")[i];
      }
      excerpt = excerpt.replace(/(<([^>]+)>)/gi, "");
      // let excerpt = p.post_content.trim().split("\n")[0];
      // .replace(/(<([^>]+)>)/gi, "");
      if (excerpt.length > maxLength) {
        var tempExcerpt = excerpt.substring(0, maxLength);
        excerpt = tempExcerpt.substring(0, tempExcerpt.lastIndexOf(".")) + ".";
      }
      p.post_excerpt = excerpt;
    }
    var img = hasImage(p.post_content);
    if (img !== null) {
      p.cover_image = img;
    }
    return p;
  });
  return newData;
}

export function hasImage(content) {
  var div = document.createElement("div");
  div.innerHTML = content;
  var firstImage = div.querySelectorAll("img")[0];

  if (firstImage !== undefined) {
    return firstImage;
  } else {
    return null;
  }
}

export function removeHome(content) {
  var div = document.createElement("div");
  var uglyDiv = document.createElement("div");
  div.innerHTML = content;
  if (
    div.childNodes[0].nodeName !== "#text" &&
    div.childNodes[0].nodeName !== "P"
  ) {
    uglyDiv.innerHTML = content;
    div.innerHTML = null;
  }

  return { uglyDiv: uglyDiv.innerHTML, prettyDiv: div.innerHTML };
}

export function randomImage() {
  const randomImage = [
    "https://media-exp1.licdn.com/dms/image/C511BAQFuptKQFmdDMQ/company-background_10000/0?e=2159024400&v=beta&t=LL5-QWwjotGxNdT8uVoNp6WQmgMDOnVy490S5PnEluM",
    "https://upload.wikimedia.org/wikipedia/en/8/89/Columbia_University_Shield.png",
    "https://econ.columbia.edu/wp-content/uploads/sites/41/2017/10/dreamstime_xxl_110309746-1.jpg",
    "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F144663665%2F0x0.jpg%3Ffit%3Dscale",
    "https://static01.nyt.com/images/2020/03/08/nyregion/08xp-columbia1/08xp-columbia1-videoSixteenByNineJumbo1600.jpg",
    "https://gs.columbia.edu/sites/default/files/styles/cu_crop/public/content/News/columbia-gs-news-campus-shot-alma-butler-library.png?itok=_pjYOX-8",

    "https://cloudfront-us-east-1.images.arcpublishing.com/spectator/BMSFKGOSQJCRZGLLXTP2SKB2VE.jpg",
  ];
  return randomImage[Math.floor(Math.random() * randomImage.length)];
}
function excerptJunk(content) {
  if (content === "&nbsp;") {
    return true;
  }
  return false;
}
