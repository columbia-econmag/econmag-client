export default function makePretty(articles, maxLength = 500) {
  const newData = articles.data.map((post) => {
    var p = post;
    if (p.post_excerpt === "") {
      var excerpt = p.post_content.trim().split("\n")[0];
      var i = 0;
      while (hasImage(excerpt) != null || excerpt.length < 10) {
        i++;
        excerpt = p.post_content.trim().split("\n")[i];
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
  var firstImage = div.getElementsByTagName("img")[0];

  if (firstImage !== undefined) {
    // console.log(firstImage.toString());
    return firstImage;
  } else {
    return null;
  }
}

export function removeHome(content) {
  var div = document.createElement("div");
  var uglyDiv = document.createElement("div");
  div.innerHTML = content;
  if (div.childNodes[0].nodeName !== "#text") {
    uglyDiv.innerHTML = content;
    div.innerHTML = null;
  } else {
    var a_s = div.getElementsByTagName("a");

    for (var i = 0; i < a_s.length; i++) {
      if (a_s[i].href === "http://columbiaeconreview.com/") {
        div.removeChild(a_s[i]);
      }
    }
  }

  return { uglyDiv: uglyDiv.innerHTML, prettyDiv: div.innerHTML };
}

export function randomImage() {
  const randomImage = [
    "https://media-exp1.licdn.com/dms/image/C511BAQFuptKQFmdDMQ/company-background_10000/0?e=2159024400&v=beta&t=LL5-QWwjotGxNdT8uVoNp6WQmgMDOnVy490S5PnEluM",
    "data:image/png;base64,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",
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
