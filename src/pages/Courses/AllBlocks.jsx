import React from 'react'
import FetchBlocksfromSanity from './FetchBlocksFromSanity';

function AllBlocks() {
const blocks = FetchBlocksfromSanity()

  const allBlocks = blocks.map((item, index) => {
    const content = item.coverImage ? (
      <img
        alt=""
        style={{
          height: "100px",
          width: "100px",
        }}
        src={imgurlFor(item.coverImage.asset._ref)}
      />
    ) : null;

    let imgurl = defaultCoursesImages.find((subItem) => {
      return subItem.subject === item.subject;
    });

    // filterCompletedBlocks = blocksCompleted?.filter(
    //   (subItem) => subItem.blockName === item.blockName
    // );

    // let highestPercentageScore;

    // if (filterCompletedBlocks) {
    //   highestPercentageScore = Math.round(
    //     filterCompletedBlocks[0]?.PercentageScores
    //   );
    // }

    return (
      <Link
        className="animate__animated animate__fadeIn"
        style={{
          display: "flex",
          width: "100%",
          textDecoration: "none",
          animationDelay: `${index / 20}s`,
        }}
        to={`/courses/${item.subject}/${item.courseName}/${item.blockName}`}
      >
        <Box darkThemeActive={darkThemeActive}>
          <Text>
            {" "}
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                paddingLeft: "10px",
                fontWeight: "600",
              }}
            >
              {item.subject}
            </p>
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                padding: "12px",
              }}
            >
              {item.blockName}
            </p>
          </Text>

          {content ? (
            <Image>{content}</Image>
          ) : (
            <Img
              src={
                imgurl
                  ? imgurl.imageUrl
                  : "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
              }
            ></Img>
          )}
        </Box>
      </Link>
    );
  });



  return (
    <div>AllBlocks</div>
  )
}

export default AllBlocks