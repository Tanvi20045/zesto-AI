import HeroSection from "../components/home/HeroSection";
import Categories from "../components/home/Categories";
import Products from "../components/home/Products";

function HomePage({ activeCategory, setActiveCategory, searchQuery }) {
  return (
    <main className="fade-up">
      <HeroSection />
      <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <Products activeCategory={activeCategory} searchQuery={searchQuery} />
    </main>
  );
}

export default HomePage;
