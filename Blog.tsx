import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Tag, Search, TrendingUp, Share2, Bookmark } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { Newsletter } from './Newsletter';

export const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mango Care', 'Recipes', 'Health', 'Sustainability', 'History', 'Business'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-mango-dark mb-6">Mango Care & <span className="text-mango-orange">Recipes</span></h1>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg">
              Discover tips for storing mangoes, delicious recipes, and stories from our farms.
            </p>
          </motion.div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-16 space-y-8">
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search articles, recipes, tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-5 bg-white border border-stone-200 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-mango-orange focus:border-transparent transition-all text-stone-700 font-medium pl-16"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400" size={24} />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === category 
                    ? 'bg-mango-dark text-white shadow-lg' 
                    : 'bg-white text-stone-500 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {filteredPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-100 group flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-mango-orange flex items-center gap-2 uppercase tracking-widest">
                    <Tag size={12} />
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-6 right-6 flex gap-2">
                  <button className="p-3 bg-white/90 backdrop-blur-md rounded-full text-stone-600 hover:text-mango-orange transition-colors">
                    <Bookmark size={16} />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur-md rounded-full text-stone-600 hover:text-mango-orange transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] font-bold text-stone-400 mb-6 uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-mango-dark mb-4 leading-tight group-hover:text-mango-orange transition-colors">
                  {post.title}
                </h3>
                <p className="text-stone-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6 border-t border-stone-50 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-mango-dark font-bold hover:gap-3 transition-all group/btn text-sm uppercase tracking-widest">
                    Read Full Article
                    <ArrowRight size={18} className="text-mango-orange" />
                  </button>
                  <div className="flex items-center gap-1 text-mango-yellow">
                    <TrendingUp size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Trending</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500 text-lg">No articles found matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-4 text-mango-orange font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Featured Recipe Section */}
        <div className="mt-24 bg-mango-green rounded-[48px] p-10 md:p-20 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="px-4 py-2 bg-white/20 rounded-full text-[10px] font-bold mb-6 inline-block uppercase tracking-widest">Featured Recipe</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">Authentic Multani <br />Mango Lassi</h2>
              <p className="text-white/80 mb-10 leading-relaxed text-lg">
                The perfect summer cooler. Learn how to make the traditional Multani style lassi 
                using our premium Sindhri mangoes.
              </p>
              <button className="px-10 py-5 bg-white text-mango-green font-bold rounded-2xl hover:bg-mango-yellow hover:text-mango-dark transition-all uppercase tracking-widest text-sm shadow-xl">
                Get the Recipe
              </button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=800" 
                alt="Mango Lassi" 
                className="rounded-[40px] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-mango-yellow text-mango-dark p-6 rounded-3xl shadow-xl font-bold">
                <p className="text-xs uppercase tracking-widest mb-1">Prep Time</p>
                <p className="text-2xl font-display">10 Mins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Integration */}
        <div className="mt-24">
          <Newsletter />
        </div>

        {/* More Content: Mango Varieties Guide */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            { title: "Storage Guide", desc: "Learn how to keep your mangoes fresh for up to 2 weeks.", icon: <Calendar size={24} /> },
            { title: "Ripening Tips", desc: "Discover the best way to ripen mangoes naturally at home.", icon: <Tag size={24} /> },
            { title: "Health Benefits", desc: "Why mangoes are the ultimate superfood for your body.", icon: <User size={24} /> }
          ].map((item, index) => (
            <div key={index} className="p-10 bg-white rounded-[40px] border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-mango-bg rounded-2xl flex items-center justify-center text-mango-orange mb-8 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-mango-dark mb-4">{item.title}</h4>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">{item.desc}</p>
              <button className="text-mango-orange font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                Read More
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
