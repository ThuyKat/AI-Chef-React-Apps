import chefIcon from "../images/chef-claude-icon.png";
export default function Header() {
  return (
    <header className="container">
      <img src={chefIcon} alt="chef-claude icon" />
      <p>Chef Claude</p>
    </header>
  );
}
