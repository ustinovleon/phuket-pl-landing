import { MapPin, Maximize2, Calendar, FileText, ChevronRight, Home } from 'lucide-react';
import type { Property } from '../types';
import { formatCurrency, getCategoryBadgeClass, getCategoryLabel, formatCompletion } from '../utils/format';
import { useAnalytics } from '../hooks/useAnalytics';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent('object_open', { 
      propertyId: property.id, 
      projectName: property.projectName,
      category: property.statusCategory 
    });
    onSelect(property);
  };

  // Format size range
  const sizeRange = property.sizeSqmFrom === property.sizeSqmTo 
    ? `${property.sizeSqmFrom} m²`
    : `${property.sizeSqmFrom}–${property.sizeSqmTo} m²`;

  return (
    <div 
      className="card cursor-pointer group"
      onClick={handleClick}
    >
      {/* Image Container - optimized aspect ratio for mobile */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
          alt={property.projectName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Gradient overlay for better badge visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        
        {/* Badges - repositioned for mobile */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
          <span className={`badge ${getCategoryBadgeClass(property.statusCategory)} text-xs sm:text-sm`}>
            {getCategoryLabel(property.statusCategory)}
          </span>
          <span className="badge bg-white/95 text-slate-700 text-xs sm:text-sm shadow-sm">
            {property.ownership}
          </span>
        </div>
      </div>

      {/* Content - optimized padding and spacing for mobile */}
      <div className="p-4 sm:p-6">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="font-display text-lg sm:text-xl text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
            {property.projectName}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{property.area}, Phuket</span>
          </div>
        </div>

        {/* Key Info Grid - better layout for mobile */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 py-3 px-3 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span className="text-sm text-slate-700 font-medium">{sizeRange}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span className="text-sm text-slate-700 font-medium">{formatCompletion(property.completion)}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
            <Home className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span className="text-sm text-slate-700 font-medium">
              {property.propertyType === 'CONDO' ? 'Apartament' : 'Willa'}
            </span>
          </div>
        </div>

        {/* Price Section - prominent display */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm text-slate-500 mb-0.5">Cena od</div>
              <div className="font-display text-xl sm:text-2xl text-brand-600 truncate">
                {formatCurrency(property.priceFromEUR)}
              </div>
            </div>
            <button className="flex items-center gap-1 text-brand-600 font-medium text-sm whitespace-nowrap bg-brand-50 hover:bg-brand-100 px-3 py-2 rounded-lg transition-colors group-hover:gap-2">
              Szczegóły
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Documents indicator - simplified for mobile */}
        {property.docs.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FileText className="w-3.5 h-3.5" />
              <span>{property.docs.length} dokument{property.docs.length > 1 ? 'y' : ''} dostępn{property.docs.length > 1 ? 'e' : 'y'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
