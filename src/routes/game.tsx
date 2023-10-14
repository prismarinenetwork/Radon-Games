import { games } from "../util/games";
import { NotFound } from "./404";
import { motion } from "framer-motion";
import { useState } from "preact/hooks";
import {
  PiCornersOutBold,
  PiCornersInBold,
  PiThumbsUpBold,
  PiThumbsDownBold
} from "react-icons/pi";

export function Game(props: { id: string }) {
  const game = games.find((game) => game.id === props.id);
  const [fullscreen, setFullscreen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  if (!game) {
    return <NotFound />;
  }

  window.addEventListener("keypress", (e) => {
    if (e.key === "Escape") {
      document.exitFullscreen();
      setFullscreen(false);
    }
  });

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="flex justify-center px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <div class="my-16 flex w-[95%] flex-col overflow-hidden rounded-lg bg-bg-secondary shadow-lg">
        <iframe
          id="game"
          class="aspect-video w-full"
          src={`/cdn/embed/${game.type}?id=${game.id}${
            game.type === "emulator" && `&emu=${game.emulator}`
          }`}
        ></iframe>
        <div class="flex justify-between gap-2 p-5 pb-0">
          <div>
            <h1 class="text-2xl font-bold">{game.title}</h1>
            <div>
              {game.tags.map((tag) => {
                return (
                  <a
                    class="inset-0 rounded bg-accent-secondary p-1 text-xs font-bold uppercase tracking-wide transition-all hover:scale-110"
                    href={`/tag/${tag}`}
                  >
                    {tag}
                  </a>
                );
              })}
            </div>
          </div>
          <div class="text-2xl">
            {fullscreen ? <PiCornersInBold /> : <PiCornersOutBold />}
          </div>
        </div>
        <p class="p-5">{game.description}</p>
      </div>
    </motion.main>
  );
}
