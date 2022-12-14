import React, { useState, useEffect } from "react";
// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container"
import CardMedia from "@mui/material/CardMedia";
// import Button from '@mui/material/Button'
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function AssetView() {
  // const theme = useTheme();
  const location = useLocation();
  const assetType = location.state.type;
  const [assetData, setAssetData] = useState([]);
  const [cartData, setCartData] = useState([]);

  let userId = parseInt(location.state.user.userToken);

  const url = `http://localhost:8080/assets/${assetType}`;

  useEffect(() => {
    const getAssetData = async () => {
      const response = await axios.get(url);
      const data = await response.data;
      setAssetData(data);
    };
    getAssetData();
  }, [location.state.type]);

  useEffect(() => {
    localStorage.setItem("cartInfo", JSON.stringify(cartData));
  }, [cartData]);

  const handleRemove = (event, id) => {
    const newArray = cartData;
    const filtered = newArray.filter((item) => item.assetId !== id);
    setCartData(filtered);
  };

  const handleAdd = (event, asset) => {
    const cartItem = {
      asset_id: asset.id,
      user_id: userId
    };
    axios.post('http://localhost:8080/cart', cartItem)
  };

  console.log(cartData);

  return (
    <>
      <Header />
      <Box sx={{
        display: "flex",
        gridColumn: "span 3",
        margin: 1,
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}>
        {assetData.map((asset) => (
          <Card
            sx={{ margin: 1, flexWrap: "wrap" }}
            key={asset.id}

          >
            <CardMedia
              component="img"
              sx={{ width: 500, height: 500, margin: 1, justifySelf: "center" }}
              image={asset.image_url}
              alt="Live from space album cover"
            />
            <Box sx={{}}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {asset.asset_name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {asset.description}
                </Typography>

                <IconButton
                  size="large"
                  color="success"
                  aria-label="addButton"
                  id={asset.id}
                  onClick={(e) => {
                    handleAdd(e, asset);
                  }}
                >
                  <AddCircleRoundedIcon fontSize="large" />
                </IconButton>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>

    </>
  );
}
