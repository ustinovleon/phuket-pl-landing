import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Percent, Calendar } from 'lucide-react';
import { formatPercent } from '../utils/format';
import { useAnalytics } from '../hooks/useAnalytics';

interface CalculatorInputs {
  purchasePrice: number;
  holdingPeriod: number;
  netYieldLow: number;
  netYieldHigh: number;
  appreciationLow: number;
  appreciationHigh: number;
}

const defaultInputs: CalculatorInputs = {
  purchasePrice: 500000,
  holdingPeriod: 5,
  netYieldLow: 6,
  netYieldHigh: 9,
  appreciationLow: 7,
  appreciationHigh: 10,
};

export default function CalculatorSection() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const { trackEvent } = useAnalytics();

  const results = useMemo(() => {
    const { purchasePrice, holdingPeriod, netYieldLow, netYieldHigh, appreciationLow, appreciationHigh } = inputs;

    const rentalIncomeLow = purchasePrice * (netYieldLow / 100) * holdingPeriod;
    const rentalIncomeHigh = purchasePrice * (netYieldHigh / 100) * holdingPeriod;

    const resaleValueLow = purchasePrice * Math.pow(1 + appreciationLow / 100, holdingPeriod);
    const resaleValueHigh = purchasePrice * Math.pow(1 + appreciationHigh / 100, holdingPeriod);

    const totalReturnLow = rentalIncomeLow + (resaleValueLow - purchasePrice);
    const totalReturnHigh = rentalIncomeHigh + (resaleValueHigh - purchasePrice);

    const annualizedReturnLow = ((totalReturnLow / purchasePrice) / holdingPeriod) * 100;
    const annualizedReturnHigh = ((totalReturnHigh / purchasePrice) / holdingPeriod) * 100;

    return {
      rentalIncomeLow,
      rentalIncomeHigh,
      resaleValueLow,
      resaleValueHigh,
      totalReturnLow,
      totalReturnHigh,
      annualizedReturnLow,
      annualizedReturnHigh,
    };
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    trackEvent('calculator_use', { field, value });
  };

  const formatPLN = (amount: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 md:py-32 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-brand-400 font-medium text-sm tracking-wide uppercase mb-3 block">
            Kalkulator scenariuszy
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
            Oblicz scenariusz inwestycyjny
          </h2>
          <p className="text-lg text-slate-400">
            Symuluj różne scenariusze z własnymi założeniami. 
            Wyniki służą jedynie orientacji.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cena zakupu (PLN)
              </label>
              <div className="relative">
                <input
                  type="range"
                  min={250000}
                  max={2500000}
                  step={25000}
                  value={inputs.purchasePrice}
                  onChange={(e) => handleInputChange('purchasePrice', Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-slate-400">250 000 PLN</span>
                  <span className="font-mono text-lg text-brand-400">
                    {formatPLN(inputs.purchasePrice)}
                  </span>
                  <span className="text-sm text-slate-400">2 500 000 PLN</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Okres utrzymania (lata)
              </label>
              <div className="flex gap-2">
                {[3, 5, 7, 10].map((year) => (
                  <button
                    key={year}
                    onClick={() => handleInputChange('holdingPeriod', year)}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      inputs.holdingPeriod === year
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {year} lat
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rentowność netto (rocznie)
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="text-xs text-slate-400 mb-1">Min</div>
                    <select
                      value={inputs.netYieldLow}
                      onChange={(e) => handleInputChange('netYieldLow', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    >
                      {[6, 7, 8].map((v) => (
                        <option key={v} value={v}>{v}%</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400 mb-1">Max</div>
                    <select
                      value={inputs.netYieldHigh}
                      onChange={(e) => handleInputChange('netYieldHigh', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    >
                      {[8, 9].map((v) => (
                        <option key={v} value={v}>{v}%</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Wzrost wartości (rocznie)
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="text-xs text-slate-400 mb-1">Min</div>
                    <select
                      value={inputs.appreciationLow}
                      onChange={(e) => handleInputChange('appreciationLow', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    >
                      {[5, 6, 7, 8].map((v) => (
                        <option key={v} value={v}>{v}%</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400 mb-1">Max</div>
                    <select
                      value={inputs.appreciationHigh}
                      onChange={(e) => handleInputChange('appreciationHigh', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    >
                      {[8, 9, 10].map((v) => (
                        <option key={v} value={v}>{v}%</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-700">
            <h3 className="font-display text-xl text-white mb-6">
              Wynik scenariusza po {inputs.holdingPeriod} latach
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-brand-400" />
                  </div>
                  <span className="text-slate-300">Dochód z najmu (suma)</span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg text-white">
                    {formatPLN(results.rentalIncomeLow)} - {formatPLN(results.rentalIncomeHigh)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-brand-400" />
                  </div>
                  <span className="text-slate-300">Wartość odsprzedaży</span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg text-white">
                    {formatPLN(Math.round(results.resaleValueLow))} - {formatPLN(Math.round(results.resaleValueHigh))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Percent className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-slate-300">Całkowity zysk (brutto)</span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xl text-emerald-400 font-medium">
                    {formatPLN(Math.round(results.totalReturnLow))} - {formatPLN(Math.round(results.totalReturnHigh))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-brand-400" />
                  </div>
                  <span className="text-slate-300">Rentowność roczna</span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-2xl text-brand-400 font-medium">
                    {formatPercent(results.annualizedReturnLow)} - {formatPercent(results.annualizedReturnHigh)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <p className="text-amber-200 text-sm">
                <strong>Wyłączenie odpowiedzialności:</strong> Ta kalkulacja służy wyłącznie 
                ilustracji możliwych scenariuszy. Nie stanowi porady inwestycyjnej i 
                nie uwzględnia podatków, kosztów transakcyjnych ani okresów pustostanów. Historyczne 
                wyniki nie gwarantują przyszłych rezultatów.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
