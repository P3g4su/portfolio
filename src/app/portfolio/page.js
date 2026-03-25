import projects from "../../data/projects.json";
import PortfolioClient from "./PortfolioClient";

export default function PortfolioPage() {
  return <PortfolioClient projects={projects} />;
}