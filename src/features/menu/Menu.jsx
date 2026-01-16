import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant.js";
import MenuItem from "./MenuItem.jsx";
function Menu() {
  const menu = useLoaderData();

  if (!Array.isArray(menu)) return null;

  return (
    <>
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
