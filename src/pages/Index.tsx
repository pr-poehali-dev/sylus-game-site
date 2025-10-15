import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const skins = [
  {
    id: 1,
    name: 'Классический Sylus',
    description: 'Элегантный образ с кошачьими ушками',
    unlocked: true,
    image: 'https://cdn.poehali.dev/files/389e001a-1a30-4cea-9a6a-ad623de382f3.jpg'
  },
  {
    id: 2,
    name: 'Костюм Динозавра',
    description: 'Милый чиби в костюме маленького динозаврика',
    unlocked: true,
    image: 'https://cdn.poehali.dev/projects/3ad4f3d5-e9af-49a9-bb6a-6ca07a4cc204/files/66c6c933-7172-4ee0-8fb1-b00debebf52e.jpg'
  },
  {
    id: 3,
    name: 'Костюм Медвежонка',
    description: 'Уютный образ плюшевого мишки',
    unlocked: false,
    image: 'https://cdn.poehali.dev/projects/3ad4f3d5-e9af-49a9-bb6a-6ca07a4cc204/files/49ed78f5-2f1f-45bf-9e44-100efb943137.jpg'
  }
];

export default function Index() {
  const [selectedSkin, setSelectedSkin] = useState(skins[0]);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      const step = 5;
      setPlayerPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;
        
        if (e.key === 'ArrowUp' || e.key === 'w') newY = Math.max(0, prev.y - step);
        if (e.key === 'ArrowDown' || e.key === 's') newY = Math.min(100, prev.y + step);
        if (e.key === 'ArrowLeft' || e.key === 'a') newX = Math.max(0, prev.x - step);
        if (e.key === 'ArrowRight' || e.key === 'd') newX = Math.min(100, prev.x + step);
        
        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setScore(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setPlayerPosition({ x: 50, y: 50 });
  };

  const stopGame = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen game-gradient text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4 tracking-wider">
            <span className="text-primary">SYLUS</span> GAME
          </h1>
          <p className="text-muted-foreground text-lg">Love and Deepspace Universe</p>
        </header>

        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-card">
            <TabsTrigger value="game" className="font-semibold">
              <Icon name="Gamepad2" className="mr-2 h-4 w-4" />
              Игра
            </TabsTrigger>
            <TabsTrigger value="skins" className="font-semibold">
              <Icon name="Shirt" className="mr-2 h-4 w-4" />
              Скины
            </TabsTrigger>
            <TabsTrigger value="rules" className="font-semibold">
              <Icon name="BookOpen" className="mr-2 h-4 w-4" />
              Правила
            </TabsTrigger>
          </TabsList>

          <TabsContent value="game" className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Скин:</span>
                    <span className="ml-2 font-semibold">{selectedSkin.name}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Счёт:</span>
                    <span className="ml-2 font-bold text-primary text-xl">{score}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!isPlaying ? (
                    <Button onClick={startGame} className="accent-gradient font-semibold">
                      <Icon name="Play" className="mr-2 h-4 w-4" />
                      Начать игру
                    </Button>
                  ) : (
                    <Button onClick={stopGame} variant="secondary" className="font-semibold">
                      <Icon name="Square" className="mr-2 h-4 w-4" />
                      Стоп
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative w-full aspect-video bg-secondary/30 rounded-lg border-2 border-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10"></div>
                
                <div
                  className="absolute w-24 h-24 transition-all duration-100 ease-linear"
                  style={{
                    left: `${playerPosition.x}%`,
                    top: `${playerPosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl"></div>
                    <img 
                      src={selectedSkin.image} 
                      alt={selectedSkin.name}
                      className="relative w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>

                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="text-center">
                      <Icon name="Gamepad2" className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <p className="text-xl font-semibold mb-2">Нажмите "Начать игру"</p>
                      <p className="text-muted-foreground">Используйте стрелки или WASD для управления</p>
                    </div>
                  </div>
                )}
              </div>

              {isPlaying && (
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <Icon name="Keyboard" className="inline w-4 h-4 mr-2" />
                  Управление: ← → ↑ ↓ или W A S D
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="skins" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skins.map(skin => (
                <Card 
                  key={skin.id}
                  className={`overflow-hidden transition-all cursor-pointer bg-card/50 backdrop-blur border-2 ${
                    selectedSkin.id === skin.id 
                      ? 'border-primary shadow-lg shadow-primary/30' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => skin.unlocked && setSelectedSkin(skin)}
                >
                  <div className="relative aspect-square bg-gradient-to-br from-card to-secondary/50 flex items-center justify-center">
                    <img 
                      src={skin.image} 
                      alt={skin.name}
                      className={`w-3/4 h-3/4 object-contain ${!skin.unlocked ? 'grayscale opacity-40' : ''}`}
                    />
                    {!skin.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                        <div className="text-center">
                          <Icon name="Lock" className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-semibold">Заблокировано</p>
                        </div>
                      </div>
                    )}
                    {selectedSkin.id === skin.id && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                          <Icon name="Check" className="inline w-3 h-3 mr-1" />
                          Выбран
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{skin.name}</h3>
                    <p className="text-sm text-muted-foreground">{skin.description}</p>
                    {skin.unlocked && selectedSkin.id !== skin.id && (
                      <Button 
                        className="w-full mt-4 accent-gradient font-semibold"
                        onClick={() => setSelectedSkin(skin)}
                      >
                        Выбрать скин
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur border-border max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-primary">Правила игры</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Icon name="Target" className="mr-3 text-primary" />
                    Цель игры
                  </h3>
                  <p className="text-muted-foreground leading-relaxed ml-9">
                    Управляйте персонажем Sylus и набирайте максимальное количество очков. 
                    Каждая секунда активной игры приносит вам 1 очко.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Icon name="Gamepad2" className="mr-3 text-primary" />
                    Управление
                  </h3>
                  <div className="ml-9 space-y-2">
                    <p className="text-muted-foreground"><kbd className="px-2 py-1 bg-secondary rounded">↑</kbd> или <kbd className="px-2 py-1 bg-secondary rounded">W</kbd> — движение вверх</p>
                    <p className="text-muted-foreground"><kbd className="px-2 py-1 bg-secondary rounded">↓</kbd> или <kbd className="px-2 py-1 bg-secondary rounded">S</kbd> — движение вниз</p>
                    <p className="text-muted-foreground"><kbd className="px-2 py-1 bg-secondary rounded">←</kbd> или <kbd className="px-2 py-1 bg-secondary rounded">A</kbd> — движение влево</p>
                    <p className="text-muted-foreground"><kbd className="px-2 py-1 bg-secondary rounded">→</kbd> или <kbd className="px-2 py-1 bg-secondary rounded">D</kbd> — движение вправо</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Icon name="Shirt" className="mr-3 text-primary" />
                    Скины
                  </h3>
                  <p className="text-muted-foreground leading-relaxed ml-9">
                    Открывайте новые костюмы для Sylus, чтобы разнообразить геймплей. 
                    Некоторые скины доступны сразу, другие нужно разблокировать через достижения.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Icon name="Trophy" className="mr-3 text-primary" />
                    Достижения
                  </h3>
                  <div className="ml-9 space-y-2">
                    <p className="text-muted-foreground">🥉 Новичок — наберите 50 очков</p>
                    <p className="text-muted-foreground">🥈 Эксперт — наберите 200 очков</p>
                    <p className="text-muted-foreground">🥇 Мастер — наберите 500 очков</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-center">
                  <Icon name="Info" className="inline w-4 h-4 mr-2" />
                  Совет: Оставайтесь активными и исследуйте всю игровую зону!
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}