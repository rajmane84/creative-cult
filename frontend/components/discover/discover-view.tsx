'use client';

import { useState, useMemo } from 'react';
import { motion, LayoutGroup } from 'motion/react';
import { MOCK_CULTS, MOCK_FREELANCERS, DiscoverItem } from './mock-data';
import { DiscoverHeader } from './discover-header';
import { DiscoverSpotlight } from './discover-spotlight';
import { DiscoverFilters, TabType, SortOption } from './discover-filters';
import { CultDiscoverCard } from './cult-discover-card';
import { FreelancerDiscoverCard } from './freelancer-discover-card';
import { SearchX, RefreshCw, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DiscoverView() {
  const [activeTab, setActiveTab] = useState<TabType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Disciplines');
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('FEATURED');

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Disciplines');
    setAvailabilityFilter('ALL');
    setActiveTab('ALL');
    setSortBy('FEATURED');
  };

  // Filtered Cults
  const filteredCults = useMemo(() => {
    return MOCK_CULTS.filter((cult) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        cult.name.toLowerCase().includes(query) ||
        cult.tagline.toLowerCase().includes(query) ||
        cult.location.toLowerCase().includes(query) ||
        cult.disciplines.some((d) => d.toLowerCase().includes(query)) ||
        cult.tags.some((t) => t.toLowerCase().includes(query)) ||
        cult.members.some(
          (m) =>
            m.name.toLowerCase().includes(query) ||
            m.role.toLowerCase().includes(query)
        );

      const matchesCategory =
        selectedCategory === 'All Disciplines' ||
        cult.disciplines.includes(selectedCategory);

      const matchesAvailability =
        availabilityFilter === 'ALL' ||
        cult.availability === availabilityFilter;

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [searchQuery, selectedCategory, availabilityFilter]);

  // Filtered Freelancers
  const filteredFreelancers = useMemo(() => {
    return MOCK_FREELANCERS.filter((free) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        free.name.toLowerCase().includes(query) ||
        free.username.toLowerCase().includes(query) ||
        free.headline.toLowerCase().includes(query) ||
        free.location.toLowerCase().includes(query) ||
        free.disciplines.some((d) => d.toLowerCase().includes(query)) ||
        free.skills.some((s) => s.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'All Disciplines' ||
        free.disciplines.includes(selectedCategory);

      const matchesAvailability =
        availabilityFilter === 'ALL' ||
        free.availability === availabilityFilter;

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [searchQuery, selectedCategory, availabilityFilter]);

  // Combined and sorted items
  const displayItems = useMemo(() => {
    let items: DiscoverItem[] = [];

    if (activeTab === 'ALL') {
      items = [...filteredCults, ...filteredFreelancers];
    } else if (activeTab === 'CULTS') {
      items = filteredCults;
    } else if (activeTab === 'FREELANCERS') {
      items = filteredFreelancers;
    }

    return [...items].sort((a, b) => {
      if (sortBy === 'FEATURED') {
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
      if (sortBy === 'RATING') {
        return b.rating - a.rating;
      }
      if (sortBy === 'PROJECTS') {
        return b.completedProjects - a.completedProjects;
      }
      if (sortBy === 'PRICE_LOW') {
        const priceA = a.type === 'cult' ? a.startingPriceNum : a.dailyRateNum;
        const priceB = b.type === 'cult' ? b.startingPriceNum : b.dailyRateNum;
        return priceA - priceB;
      }
      if (sortBy === 'PRICE_HIGH') {
        const priceA = a.type === 'cult' ? a.startingPriceNum : a.dailyRateNum;
        const priceB = b.type === 'cult' ? b.startingPriceNum : b.dailyRateNum;
        return priceB - priceA;
      }
      return 0;
    });
  }, [activeTab, filteredCults, filteredFreelancers, sortBy]);

  return (
    <div className="min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      {/* Full-width Header Banner */}
      <DiscoverHeader />

      {/* Full-width Spotlight Highlights Section */}
      <DiscoverSpotlight />

      {/* Full-width Search, Filter & Controls Toolbar */}
      <DiscoverFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalCultsCount={filteredCults.length}
        totalFreelancersCount={filteredFreelancers.length}
        onClearFilters={handleClearFilters}
      />

      {/* Full-width Main Content Results Section */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-12 py-10 w-full min-w-0 overflow-hidden space-y-6">
        {/* Results Info Bar */}
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground uppercase border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary selection:text-background selection:bg-primary" />
            <span>
              SHOWING {displayItems.length} RESULT
              {displayItems.length === 1 ? '' : 'S'}
            </span>
          </div>

          <span className="hidden sm:inline-block">
            ALL TRANSACTIONS ESCROW PROTECTED
          </span>
        </div>

        {/* Results Grid with Motion LayoutGroup */}
        {displayItems.length > 0 ? (
          <LayoutGroup id="discover-grid-list">
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full min-w-0 overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displayItems.map((item) => {
                if (item.type === 'cult') {
                  return <CultDiscoverCard key={item.id} cult={item} />;
                }
                return (
                  <FreelancerDiscoverCard key={item.id} freelancer={item} />
                );
              })}
            </motion.div>
          </LayoutGroup>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-dashed border-border bg-card/60 p-12 text-center space-y-4 max-w-md mx-auto my-12"
          >
            <SearchX className="w-12 h-12 text-muted-foreground mx-auto" />
            <div className="space-y-1">
              <h3 className="font-editorial text-2xl font-bold text-foreground">
                No matching results found
              </h3>
              <p className="font-mono text-xs text-muted-foreground">
                We couldn&apos;t find any collectives or freelancers matching
                your current filters.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="font-mono text-xs uppercase tracking-wider h-10 px-4"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Reset All Filters
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  );
}
