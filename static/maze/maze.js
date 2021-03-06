/**
 * Blockly Apps: Maze
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Maze application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Maze = {};

// Supported languages.
BlocklyApps.LANGUAGES = {
  // Format: ['Language name', 'direction', 'XX_compressed.js']
  ca: ['Català', 'ltr', 'en_compressed.js'],
  cs: ['Čeština', 'ltr', 'en_compressed.js'],
  da: ['Dansk', 'ltr', 'en_compressed.js'],
  de: ['Deutsch', 'ltr', 'de_compressed.js'],
  el: ['Eλληνικά', 'ltr', 'en_compressed.js'],
  'en_us': ['English', 'ltr', 'en_us_compressed.js'],
  es: ['Español', 'ltr', 'en_compressed.js'],
  eu: ['Euskara', 'ltr', 'en_compressed.js'],
  fr: ['Français', 'ltr', 'en_compressed.js'],
  hu: ['Magyar', 'ltr', 'en_compressed.js'],
  it: ['Italiano', 'ltr', 'en_compressed.js'],
  lv: ['Latviešu', 'ltr', 'en_compressed.js'],
  nl: ['Nederlands', 'ltr', 'en_compressed.js'],
  pl: ['Polski', 'ltr', 'en_compressed.js'],
  pt: ['Português', 'ltr', 'en_compressed.js'],
  ru: ['Русский', 'ltr', 'en_compressed.js'],
  sr: ['Српски', 'ltr', 'en_compressed.js'],
  sw: ['Kishwahili', 'ltr', 'en_compressed.js'],
  th: ['ภาษาไทย', 'ltr', 'en_compressed.js'],
  tr: ['Türkçe', 'ltr', 'en_compressed.js'],
  vi: ['Tiếng Việt', 'ltr', 'vi_compressed.js']
};
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="generated/' +
    BlocklyApps.LANG + '.js"></script>\n');

/**
 * Constants for cardinal directions.  Subsequent code assumes these are
 * in the range 0..3 and that opposites have an absolute difference of 2.
 * @enum {number}
 */
Maze.DirectionType = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};

// Set BlocklyApps constants.
BlocklyApps.MAX_LEVEL = 10;
BlocklyApps.LEVEL =
    BlocklyApps.getNumberParamFromUrl('level', 1, BlocklyApps.MAX_LEVEL);
BlocklyApps.CHECK_FOR_EMPTY_BLOCKS = true;

/*
 * Configuration for all levels.
 */
var LEVELS = [
  // Level 0
  {},
  // Level 1
  {
    'interstitials': [BlocklyApps.InterTypes.PRE],
    'ideal': 2,
    'requiredBlocks': [
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'videoId': '0BybP3F7DhXrUSFRhMnBGLUVPZTA',
    'startDirection': Maze.DirectionType.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 1, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 2
  {
    'interstitials': [BlocklyApps.InterTypes.POST],
    'ideal': 5,
    'requiredBlocks': [
      {'test': 'moveForward', 'type': 'maze_moveForward'},
      {'test': 'turnLeft', 'type': 'maze_turn', 'params': {'DIR': 'turnLeft'}},
      {'test': 'turnRight', 'type': 'maze_turn', 'params': {'DIR': 'turnRight'}}
    ],
    'startDirection': Maze.DirectionType.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 3, 0, 0, 0],
      [0, 0, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 3
  {
    'interstitials': [BlocklyApps.InterTypes.PRE],
    'ideal': 2,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'videoId': '0BybP3F7DhXrUU2FCODdJdXRKVTQ',
    'startDirection': Maze.DirectionType.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 4
  {
    'interstitials': [BlocklyApps.InterTypes.NONE],
    'ideal': 5,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'turnLeft', 'type': 'maze_turn', 'params': {'DIR': 'turnLeft'}},
      {'test': 'turnRight', 'type': 'maze_turn', 'params': {'DIR': 'turnRight'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Maze.DirectionType.EAST,
    /**
     *  Note, the path continues past the start and the goal in both directions.
     *  This is intentional so kids see the maze is about getting from the start
     *  to the finish and not necessarily about moving over every part of the maze,
     *  'mowing the lawn' as Neil calls it.
     */
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 3, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 2, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 5
  {
    'interstitials': [BlocklyApps.InterTypes.PRE | BlocklyApps.InterTypes.POST],
    'ideal': 4,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathLeft', 'type': 'maze_if', 'params': {'DIR': 'isPathLeft'}},
      {'test': 'turnLeft', 'type': 'maze_turn', 'params': {'DIR': 'turnLeft'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'videoId': '0BybP3F7DhXrUSFRhMnBGLUVPZTA',
    'startDirection': Maze.DirectionType.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 2, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 6
  {
    'interstitials': [BlocklyApps.InterTypes.PRE],
    'ideal': 4,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathLeft', 'type': 'maze_if', 'params': {'DIR': 'isPathLeft'}},
      {'test': 'turnLeft', 'type': 'maze_turn', 'params': {'DIR': 'turnLeft'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Maze.DirectionType.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 3, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 7
  {
    'interstitials': [BlocklyApps.InterTypes.NONE],
    'ideal': 4,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathRight', 'type': 'maze_if', 'params': {'DIR': 'isPathRight'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Maze.DirectionType.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 3, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 8
  {
    'interstitials': [BlocklyApps.InterTypes.NONE],
    'ideal': 6,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathRight', 'type': 'maze_if', 'params': {'DIR': 'isPathRight'}},
      {'test': 'isPathLeft', 'type': 'maze_if', 'params': {'DIR': 'isPathLeft'}},
      {'test': 'turnLeft', 'type': 'maze_turn', 'params': {'DIR': 'turnLeft'}},
      {'test': 'turnRight', 'type': 'maze_turn', 'params': {'DIR': 'turnRight'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Maze.DirectionType.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0],
      [0, 2, 1, 1, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 9
  {
    'interstitials': [BlocklyApps.InterTypes.PRE | BlocklyApps.InterTypes.POST],
    'ideal': 6,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathForward', 'type': 'maze_ifElse',
                                'params': {'DIR': 'isPathForward'}},
      {'test': 'turnLeft', 'type': 'maze_turn', 'params': {'DIR': 'turnLeft'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Maze.DirectionType.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [3, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  // Level 10
  {
    'interstitials': [BlocklyApps.InterTypes.NONE],
    'ideal': 5,
    'requiredBlocks': [
      {'test': 'while', 'type': 'maze_forever'},
      {'test': 'isPathForward', 'type': 'maze_ifElse',
                                'params': {'DIR': 'isPathForward'}},
      {'test': 'turnRight', 'type': 'maze_turn', 'params': {'DIR': 'turnRight'}},
      {'test': 'moveForward', 'type': 'maze_moveForward'}
    ],
    'startDirection': Maze.DirectionType.EAST,
    'map': [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 1, 1, 0],
      [0, 1, 3, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
];

/**
 * Current Level configuration.
 */
var CURRENT_LEVEL = LEVELS[BlocklyApps.LEVEL];


/**
 * Blocks that are expected to be used on each level.
 * The block will be displayed as feedback in the order below.
 * 'test' is the string that will be searched for in the code.
 * 'type' is the type of block to be generated as feedback.
 * 'params' are optional and create a more specific block of the given type.
 */
BlocklyApps.REQUIRED_BLOCKS = CURRENT_LEVEL.requiredBlocks;

//The number of blocks to show as feedback.
BlocklyApps.NUM_REQUIRED_BLOCKS_TO_FLAG = 10;

Maze.SKINS = [
  // sprite: A 1029x51 set of 21 avatar images.
  // tiles: A 250x200 set of 20 map images.
  // marker: A 20x34 goal image.
  // background: An optional 400x450 background image, or false.
  // graph: Colour of optional grid lines, or false.
  // look: Colour of sonar-like look icon.
  {
    sprite: 'pegman.png',
    tiles: 'tiles_pegman.png',
    marker: 'marker.png',
    background: false,
    // TODO: Need to update to the associated obstacles
    obstacle: 'cat.png',
    graph: false,
    look: '#000'
  },
  {
    sprite: 'astro.png',
    tiles: 'tiles_astro.png',
    marker: 'marker.png',
    background: 'bg_astro.jpg',
    // TODO: Need to update to the associated obstacles
    obstacle: 'cat.png',
    // Coma star cluster, photo by George Hatfield, used with permission.
    graph: false,
    look: '#fff'
  },
  {
    sprite: 'zombieman.png',
    tiles: 'tiles_panda.png',
    marker: 'mkr_sunflower.png',
    background: 'board_pvz.png',
    // TODO: Need to update to the associated obstacles
    obstacle: 'cat.png',
    // Coma star cluster, photo by George Hatfield, used with permission.
    graph: false,
    look: '#fff'
  },
  {
    sprite: 'mouse.png',
    tiles: 'tiles_mouse.png',
    marker: 'marker_mouse.png',
    background: 'bg_mouse.png',
    // TODO: Need to update to the associated obstacles
    obstacle: 'cat.png',
    graph: false,
    look: '#fff'
  },
  {
    sprite: 'panda.png',
    tiles: 'tiles_panda.png',
    marker: 'marker.png',
    background: 'bg_panda.jpg',
    // TODO: Need to update to the associated obstacles
    obstacle: 'cat.png',
    // Spring canopy, photo by Rupert Fleetingly, CC licensed for reuse.
    graph: false,
    look: '#000'
  }
];

BlocklyApps.SKIN_ID =
    BlocklyApps.getNumberParamFromUrl('skin', 0, Maze.SKINS.length);
Maze.SKIN = Maze.SKINS[BlocklyApps.SKIN_ID];

/**
 * Google Drive video ID.
 * 'null' is used because IE8 does not like trailing commas in arrays, and it is
 *     used throughout the array for consistency.
 */
Maze.VIDEO_ID = CURRENT_LEVEL.videoId;

/**
 * Milliseconds between each animation frame.
 */
Maze.stepSpeed;

/**
 * The types of squares in the maze, which is represented
 * as a 2D array of SquareType values.
 * @enum {number}
 */
Maze.SquareType = {
  WALL: 0,
  OPEN: 1,
  START: 2,
  FINISH: 3,
  OBSTACLE: 4
};

// The maze square constants defined above are inlined here
// for ease of reading and writing the static mazes.
Maze.map = CURRENT_LEVEL.map;

// Add blank row at top for hint bubble.
Maze.map.unshift([0, 0, 0, 0, 0, 0, 0, 0]);

/**
 * Measure maze dimensions and set sizes.
 * ROWS: Number of tiles down.
 * COLS: Number of tiles across.
 * SQUARE_SIZE: Pixel height and width of each maze square (i.e. tile).
 */
Maze.ROWS = Maze.map.length;
Maze.COLS = Maze.map[0].length;
Maze.SQUARE_SIZE = 50;
Maze.PEGMAN_HEIGHT = 52;
Maze.PEGMAN_WIDTH = 49;

Maze.MAZE_WIDTH = Maze.SQUARE_SIZE * Maze.COLS;
Maze.MAZE_HEIGHT = Maze.SQUARE_SIZE * Maze.ROWS;
Maze.PATH_WIDTH = Maze.SQUARE_SIZE / 3;

/**
 * Starting direction.
 */
Maze.startDirection = CURRENT_LEVEL.startDirection;

/**
 * PIDs of animation tasks currently executing.
 */
Maze.pidList = [];

// Map each possible shape to a sprite.
// Input: Binary string representing Centre/North/West/South/East squares.
// Output: [x, y] coordinates of each tile's sprite in tiles.png.
Maze.tile_SHAPES = {
  '10010': [4, 0],  // Dead ends
  '10001': [3, 3],
  '11000': [0, 1],
  '10100': [0, 2],
  '11010': [4, 1],  // Vertical
  '10101': [3, 2],  // Horizontal
  '10110': [0, 0],  // Elbows
  '10011': [2, 0],
  '11001': [4, 2],
  '11100': [2, 3],
  '11110': [1, 1],  // Junctions
  '10111': [1, 0],
  '11011': [2, 1],
  '11101': [1, 2],
  '11111': [2, 2],  // Cross
  'null0': [4, 3],  // Empty
  'null1': [3, 0],
  'null2': [3, 1],
  'null3': [0, 3],
  'null4': [1, 3]
};

Maze.drawMap = function() {
  var svg = document.getElementById('svgMaze');

  // Draw the outer square.
  var square = document.createElementNS(Blockly.SVG_NS, 'rect');
  square.setAttribute('width', Maze.MAZE_WIDTH);
  square.setAttribute('height', Maze.MAZE_HEIGHT);
  square.setAttribute('fill', '#F1EEE7');
  square.setAttribute('stroke-width', 1);
  square.setAttribute('stroke', '#CCB');
  svg.appendChild(square);

  if (Maze.SKIN.background) {
    var tile = document.createElementNS(Blockly.SVG_NS, 'image');
    tile.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
        Maze.SKIN.background);
    tile.setAttribute('height', Maze.MAZE_HEIGHT);
    tile.setAttribute('width', Maze.MAZE_WIDTH);
    tile.setAttribute('x', 0);
    tile.setAttribute('y', 0);
    svg.appendChild(tile);
  }

  if (Maze.SKIN.graph) {
    // Draw the grid lines.
    // The grid lines are offset so that the lines pass through the centre of
    // each square.  A half-pixel offset is also added to as standard SVG
    // practice to avoid blurriness.
    var offset = Maze.SQUARE_SIZE / 2 + 0.5;
    for (var k = 0; k < Maze.ROWS; k++) {
      var h_line = document.createElementNS(Blockly.SVG_NS, 'line');
      h_line.setAttribute('y1', k * Maze.SQUARE_SIZE + offset);
      h_line.setAttribute('x2', Maze.MAZE_WIDTH);
      h_line.setAttribute('y2', k * Maze.SQUARE_SIZE + offset);
      h_line.setAttribute('stroke', Maze.SKIN.graph);
      h_line.setAttribute('stroke-width', 1);
      svg.appendChild(h_line);
    }
    for (var k = 0; k < Maze.COLS; k++) {
      var v_line = document.createElementNS(Blockly.SVG_NS, 'line');
      v_line.setAttribute('x1', k * Maze.SQUARE_SIZE + offset);
      v_line.setAttribute('x2', k * Maze.SQUARE_SIZE + offset);
      v_line.setAttribute('y2', Maze.MAZE_HEIGHT);
      v_line.setAttribute('stroke', Maze.SKIN.graph);
      v_line.setAttribute('stroke-width', 1);
      svg.appendChild(v_line);
    }
  }

  // Draw the tiles making up the maze map.

  // Return a value of '0' if the specified square is wall or out of bounds,
  // '1' otherwise (empty, obstacle, start, finish).
  var normalize = function(x, y) {
    if (x < 0 || x >= Maze.COLS || y < 0 || y >= Maze.ROWS) {
      return '0';
    }
    return (Maze.map[y][x] == Maze.SquareType.WALL) ? '0' : '1';
  };

  // Compute and draw the tile for each square.
  var tileId = 0;
  for (var y = 0; y < Maze.ROWS; y++) {
    for (var x = 0; x < Maze.COLS; x++) {
      // Compute the tile index.
      var tile = normalize(x, y) +
          normalize(x, y - 1) +  // North.
          normalize(x + 1, y) +  // West.
          normalize(x, y + 1) +  // South.
          normalize(x - 1, y);   // East.

      // Draw the tile.
      if (!Maze.tile_SHAPES[tile]) {
        // Empty square.  Use null0 for large areas, with null1-4 for borders.
        if (tile == '00000' && Math.random() > 0.3) {
          tile = 'null0';
        } else {
          tile = 'null' + Math.floor(1 + Math.random() * 4);
        }
      }
      var left = Maze.tile_SHAPES[tile][0];
      var top = Maze.tile_SHAPES[tile][1];
      // Tile's clipPath element.
      var tileClip = document.createElementNS(Blockly.SVG_NS, 'clipPath');
      tileClip.setAttribute('id', 'tileClipPath' + tileId);
      var clipRect = document.createElementNS(Blockly.SVG_NS, 'rect');
      clipRect.setAttribute('width', Maze.SQUARE_SIZE);
      clipRect.setAttribute('height', Maze.SQUARE_SIZE);

      clipRect.setAttribute('x', x * Maze.SQUARE_SIZE);
      clipRect.setAttribute('y', y * Maze.SQUARE_SIZE);

      tileClip.appendChild(clipRect);
      svg.appendChild(tileClip);
      // Tile sprite.
      var tile = document.createElementNS(Blockly.SVG_NS, 'image');
      tile.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
          Maze.SKIN.tiles);
      tile.setAttribute('height', Maze.SQUARE_SIZE * 4);
      tile.setAttribute('width', Maze.SQUARE_SIZE * 5);
      tile.setAttribute('clip-path', 'url(#tileClipPath' + tileId + ')');
      tile.setAttribute('x', (x - left) * Maze.SQUARE_SIZE);
      tile.setAttribute('y', (y - top) * Maze.SQUARE_SIZE);
      svg.appendChild(tile);
      tileId++;
    }
  }

  // Add finish marker.
  var finishMarker = document.createElementNS(Blockly.SVG_NS, 'image');
  finishMarker.setAttribute('id', 'finish');
  finishMarker.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
      Maze.SKIN.marker);
  finishMarker.setAttribute('height', 34);
  finishMarker.setAttribute('width', 20);
  svg.appendChild(finishMarker);

  // Pegman's clipPath element, whose (x, y) is reset by Maze.displayPegman
  var pegmanClip = document.createElementNS(Blockly.SVG_NS, 'clipPath');
  pegmanClip.setAttribute('id', 'pegmanClipPath');
  var clipRect = document.createElementNS(Blockly.SVG_NS, 'rect');
  clipRect.setAttribute('id', 'clipRect');
  clipRect.setAttribute('width', Maze.PEGMAN_WIDTH);
  clipRect.setAttribute('height', Maze.PEGMAN_HEIGHT);
  pegmanClip.appendChild(clipRect);
  svg.appendChild(pegmanClip);

  // Add pegman.
  var pegmanIcon = document.createElementNS(Blockly.SVG_NS, 'image');
  pegmanIcon.setAttribute('id', 'pegman');
  pegmanIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
      Maze.SKIN.sprite);
  pegmanIcon.setAttribute('height', Maze.PEGMAN_HEIGHT);
  pegmanIcon.setAttribute('width', Maze.PEGMAN_WIDTH * 21); // 49 * 21 = 1029
  pegmanIcon.setAttribute('clip-path', 'url(#pegmanClipPath)');
  svg.appendChild(pegmanIcon);

  // Add obstacles.
  for (var y = 0; y < Maze.ROWS; y++) {
    for (var x = 0; x < Maze.COLS; x++) {
      if (Maze.map[y][x] == Maze.SquareType.OBSTACLE) {
        var obsIcon = document.createElementNS(Blockly.SVG_NS, 'image');
        obsIcon.setAttribute('height', 40);
        obsIcon.setAttribute('width', 40);
        obsIcon.setAttributeNS(
          'http://www.w3.org/1999/xlink', 'xlink:href', Maze.SKIN.obstacle);
        obsIcon.setAttribute('x',
                             Maze.SQUARE_SIZE * (x + 0.5) -
                             obsIcon.getAttribute('width') / 2);
        obsIcon.setAttribute('y',
                             Maze.SQUARE_SIZE * (y + 0.6) -
                             obsIcon.getAttribute('height'));
        svg.appendChild(obsIcon);
      }
    }
  }
};

/**
 * Initialize Blockly and the maze.  Called on page load.
 */
Maze.init = function() {
  BlocklyApps.init();

  // Setup the Pegman (skin) menu.
  var pegmanImg = document.querySelector('#pegmanButton>img');
  pegmanImg.style.backgroundImage = 'url(' + Maze.SKIN.sprite + ')';
  var pegmanMenu = document.getElementById('pegmanMenu');
  var handlerFactory = function(n) {
    return function() {
      Maze.changePegman(n);
    };
  };
  for (var i = 0; i < Maze.SKINS.length; i++) {
    if (i == BlocklyApps.SKIN_ID) {
      continue;
    }
    var div = document.createElement('div');
    var img = document.createElement('img');
    img.src = '../media/1x1.gif';
    img.style.backgroundImage = 'url(' + Maze.SKINS[i].sprite + ')';
    div.appendChild(img);
    pegmanMenu.appendChild(div);
    Blockly.bindEvent_(div, 'mousedown', null, handlerFactory(i));
  }
  Blockly.bindEvent_(window, 'resize', null, Maze.hidePegmanMenu);

  var rtl = BlocklyApps.LANGUAGES[BlocklyApps.LANG][1] == 'rtl';
  var toolbox = document.getElementById('toolbox');

  /**
   * The richness of block colours, regardless of the hue.
   * MOOC blocks should be brighter (target audience is younger).
   * Must be in the range of 0 (inclusive) to 1 (exclusive).
   * Blockly's default is 0.45.
   */
  Blockly.HSV_SATURATION = 0.6;

  Blockly.inject(document.getElementById('blockly'),
      {path: '../',
       rtl: rtl,
       toolbox: toolbox,
       trashcan: true});
  Blockly.loadAudio_(['maze/win.mp3', 'maze/win.ogg'], 'win');
  Blockly.loadAudio_(['maze/whack.mp3', 'maze/whack.ogg'], 'whack');
  if (BlocklyApps.LEVEL == 1) {
    Blockly.SNAP_RADIUS *= 2;
  }

  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  BlocklyApps.checkTimeout(%1);\n';
  Maze.drawMap();

  var blocklyDiv = document.getElementById('blockly');
  var onresize = function(e) {
    var top = visualization.offsetTop;

    blocklyDiv.style.top = top + 'px';
    blocklyDiv.style.left = rtl ? '10px' : '420px';

    blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
    blocklyDiv.style.height = (window.innerHeight - top - 20 +
        window.scrollY) + 'px';
  };
  window.addEventListener('scroll', function() {
      onresize();
      Blockly.fireUiEvent(window, 'resize');
    });
  window.addEventListener('resize', onresize);
  onresize();

  var defaultXml =
      '<xml>' +
      '  <block type="maze_moveForward" x="70" y="70"></block>' +
      '</xml>';
  BlocklyApps.loadBlocks(defaultXml);

  // Locate the start and finish squares.
  for (var y = 0; y < Maze.ROWS; y++) {
    for (var x = 0; x < Maze.COLS; x++) {
      if (Maze.map[y][x] == Maze.SquareType.START) {
        Maze.start_ = {x: x, y: y};
      } else if (Maze.map[y][x] == Maze.SquareType.FINISH) {
        Maze.finish_ = {x: x, y: y};
      }
    }
  }

  BlocklyApps.reset(true);
  Blockly.addChangeListener(function() {BlocklyApps.updateCapacity()});

  if (BlocklyApps.INTERSTITIALS & BlocklyApps.InterTypes.PRE) {
    if (Maze.VIDEO_ID) {
      BlocklyApps.addVideoIframeSrc(Maze.VIDEO_ID);
    }
    BlocklyApps.showHelp(false, undefined);
  } else {
    document.getElementById('helpButton').setAttribute('disabled', 'disabled');
  }
};

if (window.location.pathname.match(/readonly.html$/)) {
  window.addEventListener('load', BlocklyApps.initReadonly);
} else {
  window.addEventListener('load', Maze.init);
}

/**
 * Reload with a different Pegman skin.
 * @param {number} skin ID of new skin.
 */
Maze.changePegman = function(newSkin) {
  Maze.saveToStorage();
  window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname +
      '?lang=' + BlocklyApps.LANG + '&level=' + BlocklyApps.LEVEL +
      '&skin=' + newSkin + '&mode=' + BlocklyApps.MODE;
};

/**
 * Save the blocks for a one-time reload.
 */
Maze.saveToStorage = function() {
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var text = Blockly.Xml.domToText(xml);
  window.sessionStorage.loadOnceBlocks = text;
};

/**
 * Display the Pegman skin-change menu.
 */
Maze.showPegmanMenu = function() {
  var menu = document.getElementById('pegmanMenu');
  if (menu.style.display == 'block') {
    return;  // Menu is already open.
  }
  var button = document.getElementById('pegmanButton');
  Blockly.addClass_(button, 'buttonHover');
  menu.style.top = (button.offsetTop + button.offsetHeight) + 'px';
  menu.style.left = button.offsetLeft + 'px';
  menu.style.display = 'block';
  window.setTimeout(function() {
      Maze.pegmanMenuMouse_ = Blockly.bindEvent_(document.body, 'mousedown',
                                                 null, Maze.hidePegmanMenu);
      }, 0);
};

/**
 * Hide the Pegman skin-change menu.
 */
Maze.hidePegmanMenu = function() {
  document.getElementById('pegmanMenu').style.display = 'none';
  Blockly.removeClass_(document.getElementById('pegmanButton'), 'buttonHover');
  if (Maze.pegmanMenuMouse_) {
    Blockly.unbindEvent_(Maze.pegmanMenuMouse_);
    delete Maze.pegmanMenuMouse_;
  }
};

/**
 * Reset the maze to the start position and kill any pending animation tasks.
 * @param {boolean} first True if an opening animation is to be played.
 */
BlocklyApps.reset = function(first) {
  // Kill all tasks.
  for (var x = 0; x < Maze.pidList.length; x++) {
    window.clearTimeout(Maze.pidList[x]);
  }
  Maze.pidList = [];

  // Move Pegman into position.
  Maze.pegmanX = Maze.start_.x;
  Maze.pegmanY = Maze.start_.y;

  if (first) {
    Maze.pegmanD = Maze.startDirection + 1;
    Maze.scheduleFinish(false);
    Maze.pidList.push(window.setTimeout(function() {
      Maze.stepSpeed = 100;
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4 - 4]);
      Maze.pegmanD++;
    }, Maze.stepSpeed * 5));
  } else {
    Maze.pegmanD = Maze.startDirection;
    Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4);
  }

  // Move the finish icon into position.
  var finishIcon = document.getElementById('finish');
  finishIcon.setAttribute('x', Maze.SQUARE_SIZE * (Maze.finish_.x + 0.5) -
      finishIcon.getAttribute('width') / 2);
  finishIcon.setAttribute('y', Maze.SQUARE_SIZE * (Maze.finish_.y + 0.6) -
      finishIcon.getAttribute('height'));

  // Make 'look' icon invisible and promote to top.
  var lookIcon = document.getElementById('look');
  lookIcon.style.display = 'none';
  lookIcon.parentNode.appendChild(lookIcon);
  var paths = lookIcon.getElementsByTagName('path');
  for (var i = 0, path; path = paths[i]; i++) {
    path.setAttribute('stroke', Maze.SKIN.look);
  }
};

/**
 * Click the run button.  Start the program.
 */
Maze.runButtonClick = function() {
  // Only allow a single top block on levels 1 and 2.
  if (BlocklyApps.LEVEL <= 2 && Blockly.mainWorkspace.getTopBlocks()
        .length > 1) {
    window.alert(BlocklyApps.getMsg('oneTopBlock'));
    return;
  }
  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  resetButton.style.display = 'inline';
  Blockly.mainWorkspace.traceOn(true);
  BlocklyApps.reset(false);
  Maze.execute();
};

/**
 * Outcomes of running the user program.
 */
Maze.ResultType = {
  UNSET: 0,
  SUCCESS: 1,
  FAILURE: -1,
  TIMEOUT: 2,
  ERROR: -2
};

/**
 * Execute the user's code.  Heaven help us...
 */
Maze.execute = function() {
  BlocklyApps.log = [];
  BlocklyApps.ticks = 50 * BlocklyApps.LEVEL;
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  Maze.result = Maze.ResultType.UNSET;

  // Check for empty top level blocks to warn user about bugs,
  // especially ones that lead to infinite loops.
  if (BlocklyApps.hasEmptyTopLevelBlocks()) {
    BlocklyApps.displayFeedback();
    return;
  }

  // Try running the user's code.  There are four possible outcomes:
  // 1. If pegman reaches the finish [SUCCESS], true is thrown.
  // 2. If the program is terminated due to running too long [TIMEOUT],
  //    false is thrown.
  // 3. If another error occurs [ERROR], that error is thrown.
  // 4. If the program ended normally but without solving the maze [FAILURE],
  //    no error or exception is thrown.
  // The animation should be fast if execution was successful, slow otherwise
  // to help the user see the mistake.
  try {
    eval(code);
    Maze.result = Maze.ResultType.FAILURE;
  } catch (e) {
    // A boolean is thrown for normal termination.
    // Abnormal termination is a user error.
    if (e === Infinity) {
      Maze.result = Maze.ResultType.TIMEOUT;
      Maze.stepSpeed = 0;  // Go infinitely fast so program ends quickly.
    } else if (e === true) {
      Maze.result = Maze.ResultType.SUCCESS;
      if (BlocklyApps.LEVEL == 1) {
        Maze.stepSpeed = 150;
      } else if (BlocklyApps.LEVEL <= 3) {
        Maze.stepSpeed = 100;
      } else if (BlocklyApps.LEVEL <= 5) {
        Maze.stepSpeed = 80;
      } else {
        Maze.stepSpeed = 60;
      }
    } else if (e === false) {
      Maze.result = Maze.ResultType.ERROR;
      Maze.stepSpeed = 150;
    } else {
      // Syntax error, can't happen.
      Maze.result = Maze.ResultType.ERROR;
      alert(e);
      return;
    }
  }

  // Report result to server.
  BlocklyApps.report('maze', BlocklyApps.LEVEL_ID, BlocklyApps.LEVEL,
      Maze.result === Maze.ResultType.SUCCESS, BlocklyApps.stripCode(code));

  // BlocklyApps.log now contains a transcript of all the user's actions.
  // Reset the maze and animate the transcript.
  BlocklyApps.reset(false);
  Maze.pidList.push(window.setTimeout(Maze.animate, Maze.stepSpeed));
};

/**
 * Iterate through the recorded path and animate pegman's actions.
 */
Maze.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
  Maze.pidList = [];

  var action = BlocklyApps.log.shift();
  if (!action) {
    BlocklyApps.highlight(null);
    BlocklyApps.levelComplete = (Maze.result == Maze.ResultType.SUCCESS);
    if (Maze.result == Maze.ResultType.TIMEOUT) {
      BlocklyApps.displayFeedback();
    } else {
      window.setTimeout(BlocklyApps.displayFeedback, 1000);
    }
    return;
  }

  BlocklyApps.highlight(action[1]);

  switch (action[0]) {
    case 'north':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY - 1, Maze.pegmanD * 4]);
      Maze.pegmanY--;
      break;
    case 'east':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX + 1, Maze.pegmanY, Maze.pegmanD * 4]);
      Maze.pegmanX++;
      break;
    case 'south':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY + 1, Maze.pegmanD * 4]);
      Maze.pegmanY++;
      break;
    case 'west':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX - 1, Maze.pegmanY, Maze.pegmanD * 4]);
      Maze.pegmanX--;
      break;
    case 'look_north':
      Maze.scheduleLook(Maze.DirectionType.NORTH);
      break;
    case 'look_east':
      Maze.scheduleLook(Maze.DirectionType.EAST);
      break;
    case 'look_south':
      Maze.scheduleLook(Maze.DirectionType.SOUTH);
      break;
    case 'look_west':
      Maze.scheduleLook(Maze.DirectionType.WEST);
      break;
    case 'fail_forward':
      Maze.scheduleFail(true);
      break;
    case 'fail_backward':
      Maze.scheduleFail(false);
      break;
    case 'left':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4 - 4]);
      Maze.pegmanD = Maze.constrainDirection4(Maze.pegmanD - 1);
      break;
    case 'right':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4 + 4]);
      Maze.pegmanD = Maze.constrainDirection4(Maze.pegmanD + 1);
      break;
    case 'finish':
      Maze.scheduleFinish(true);
      break;
    default:
      // action[0] is null if generated by BlocklyApps.checkTimeout().
      break;
  }

  Maze.pidList.push(window.setTimeout(Maze.animate, Maze.stepSpeed * 5));
};

/**
 * Schedule the animations for a move or turn.
 * @param {!Array.<number>} startPos X, Y and direction starting points.
 * @param {!Array.<number>} endPos X, Y and direction ending points.
 */
Maze.schedule = function(startPos, endPos) {
  var deltas = [(endPos[0] - startPos[0]) / 4,
                (endPos[1] - startPos[1]) / 4,
                (endPos[2] - startPos[2]) / 4];
  Maze.displayPegman(startPos[0] + deltas[0],
                     startPos[1] + deltas[1],
                     Maze.constrainDirection16(startPos[2] + deltas[2]));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(startPos[0] + deltas[0] * 2,
          startPos[1] + deltas[1] * 2,
          Maze.constrainDirection16(startPos[2] + deltas[2] * 2));
    }, Maze.stepSpeed));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(startPos[0] + deltas[0] * 3,
          startPos[1] + deltas[1] * 3,
          Maze.constrainDirection16(startPos[2] + deltas[2] * 3));
    }, Maze.stepSpeed * 2));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(endPos[0], endPos[1],
          Maze.constrainDirection16(endPos[2]));
    }, Maze.stepSpeed * 3));
};

/**
 * Schedule the animations and sounds for a failed move.
 * @param {boolean} forward True if forward, false if backward.
 */
Maze.scheduleFail = function(forward) {
  var deltaX = 0;
  var deltaY = 0;
  switch (Maze.pegmanD) {
    case Maze.DirectionType.NORTH:
      deltaY = -0.25;
      break;
    case Maze.DirectionType.EAST:
      deltaX = 0.25;
      break;
    case Maze.DirectionType.SOUTH:
      deltaY = 0.25;
      break;
    case Maze.DirectionType.WEST:
      deltaX = -0.25;
      break;
  }
  if (!forward) {
    deltaX = -deltaX;
    deltaY = -deltaY;
  }
  var direction16 = Maze.constrainDirection16(Maze.pegmanD * 4);
  Maze.displayPegman(Maze.pegmanX + deltaX,
                     Maze.pegmanY + deltaY,
                     direction16);
  Blockly.playAudio('whack', .5);
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX,
                       Maze.pegmanY,
                       direction16);
    }, Maze.stepSpeed));
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX + deltaX,
                       Maze.pegmanY + deltaY,
                       direction16);
    Blockly.playAudio('whack', .5);
  }, Maze.stepSpeed * 2));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, direction16);
    }, Maze.stepSpeed * 3));
};

/**
 * Schedule the animations and sound for a victory dance.
 * @param {boolean} sound Play the victory sound.
 */
Maze.scheduleFinish = function(sound) {
  var direction16 = Maze.constrainDirection16(Maze.pegmanD * 4);
  Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, 16);
  if (sound) {
    Blockly.playAudio('win', .5);
  }
  Maze.stepSpeed = 150;  // Slow down victory animation a bit.
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, 18);
    }, Maze.stepSpeed));
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, 16);
    }, Maze.stepSpeed * 2));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, direction16);
    }, Maze.stepSpeed * 3));
};

/**
 * Display Pegman at the specified location, facing the specified direction.
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 * @param {number} d Direction (0 - 15) or dance (16 - 17).
 */
Maze.displayPegman = function(x, y, d) {
  var pegmanIcon = document.getElementById('pegman');
  pegmanIcon.setAttribute('x',
      x * Maze.SQUARE_SIZE - d * Maze.PEGMAN_WIDTH + 1);
  pegmanIcon.setAttribute('y',
      Maze.SQUARE_SIZE * (y + 0.5) - Maze.PEGMAN_HEIGHT / 2 - 8);

  var clipRect = document.getElementById('clipRect');
  clipRect.setAttribute('x', x * Maze.SQUARE_SIZE + 1);
  clipRect.setAttribute('y', pegmanIcon.getAttribute('y'));
};

/**
 * Display the look icon at Pegman's current location,
 * in the specified direction.
 * @param {!Maze.DirectionType} d Direction (0 - 3).
 */
Maze.scheduleLook = function(d) {
  var x = Maze.pegmanX;
  var y = Maze.pegmanY;
  switch (d) {
    case Maze.DirectionType.NORTH:
      x += 0.5;
      break;
    case Maze.DirectionType.EAST:
      x += 1;
      y += 0.5;
      break;
    case Maze.DirectionType.SOUTH:
      x += 0.5;
      y += 1;
      break;
    case Maze.DirectionType.WEST:
      y += 0.5;
      break;
  }
  x *= Maze.SQUARE_SIZE;
  y *= Maze.SQUARE_SIZE;
  d = d * 90 - 45;

  var lookIcon = document.getElementById('look');
  lookIcon.setAttribute('transform',
      'translate(' + x + ', ' + y + ') ' +
      'rotate(' + d + ' 0 0) scale(.4)');
  var paths = lookIcon.getElementsByTagName('path');
  lookIcon.style.display = 'inline';
  for (var x = 0, path; path = paths[x]; x++) {
    Maze.scheduleLookStep(path, Maze.stepSpeed * x);
  }
};

/**
 * Schedule one of the 'look' icon's waves to appear, then disappear.
 * @param {!Element} path Element to make appear.
 * @param {number} delay Milliseconds to wait before making wave appear.
 */
Maze.scheduleLookStep = function(path, delay) {
  Maze.pidList.push(window.setTimeout(function() {
    path.style.display = 'inline';
    window.setTimeout(function() {
      path.style.display = 'none';
    }, Maze.stepSpeed * 2);
  }, delay));
};

/**
 * Keep the direction within 0-3, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Maze.constrainDirection4 = function(d) {
  if (d < 0) {
    d += 4;
  } else if (d > 3) {
    d -= 4;
  }
  return d;
};

/**
 * Keep the direction within 0-15, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Maze.constrainDirection16 = function(d) {
  if (d < 0) {
    d += 16;
  } else if (d > 15) {
    d -= 16;
  }
  return d;
};

// API
// Human-readable aliases.

Maze.moveForward = function(id) {
  Maze.move(0, id);
};

Maze.moveBackward = function(id) {
  Maze.move(2, id);
};

Maze.turnLeft = function(id) {
  Maze.turn(0, id);
};

Maze.turnRight = function(id) {
  Maze.turn(1, id);
};

Maze.isPathForward = function(id) {
  return Maze.isPath(0, id);
};

Maze.isPathRight = function(id) {
  return Maze.isPath(1, id);
};

Maze.isPathBackward = function(id) {
  return Maze.isPath(2, id);
};

Maze.isPathLeft = function(id) {
  return Maze.isPath(3, id);
};

// Core functions.

/**
 * Attempt to move pegman forward or backward.
 * @param {number} direction Direction to move (0 = forward, 2 = backward).
 * @param {string} id ID of block that triggered this action.
 * @throws {true} If the end of the maze is reached.
 * @throws {false} If Pegman collides with a wall.
 */
Maze.move = function(direction, id) {
  if (!Maze.isPath(direction, null)) {
    BlocklyApps.log.push(['fail_' + (direction ? 'backward' : 'forward'), id]);
    throw false;
  }
  // If moving backward, flip the effective direction.
  var effectiveDirection = Maze.pegmanD + direction;
  var command;
  switch (Maze.constrainDirection4(effectiveDirection)) {
    case Maze.DirectionType.NORTH:
      Maze.pegmanY--;
      command = 'north';
      break;
    case Maze.DirectionType.EAST:
      Maze.pegmanX++;
      command = 'east';
      break;
    case Maze.DirectionType.SOUTH:
      Maze.pegmanY++;
      command = 'south';
      break;
    case Maze.DirectionType.WEST:
      Maze.pegmanX--;
      command = 'west';
      break;
  }
  BlocklyApps.log.push([command, id]);
  if (Maze.pegmanX == Maze.finish_.x && Maze.pegmanY == Maze.finish_.y) {
    // Finished.  Terminate the user's program.
    BlocklyApps.log.push(['finish', null]);
    throw true;
  }
};

/**
 * Turn pegman left or right.
 * @param {number} direction Direction to turn (0 = left, 1 = right).
 * @param {string} id ID of block that triggered this action.
 */
Maze.turn = function(direction, id) {
  if (direction) {
    // Right turn (clockwise).
    Maze.pegmanD++;
    BlocklyApps.log.push(['right', id]);
  } else {
    // Left turn (counterclockwise).
    Maze.pegmanD--;
    BlocklyApps.log.push(['left', id]);
  }
  Maze.pegmanD = Maze.constrainDirection4(Maze.pegmanD);
};

/**
 * Is there a path next to pegman?
 * @param {number} direction Direction to look
 *     (0 = forward, 1 = right, 2 = backward, 3 = left).
 * @param {?string} id ID of block that triggered this action.
 *     Null if called as a helper function in Maze.move().
 * @return {boolean} True if there is a path.
 */
Maze.isPath = function(direction, id) {
  var effectiveDirection = Maze.pegmanD + direction;
  var square;
  var command;
  switch (Maze.constrainDirection4(effectiveDirection)) {
    case Maze.DirectionType.NORTH:
      square = Maze.map[Maze.pegmanY - 1] &&
          Maze.map[Maze.pegmanY - 1][Maze.pegmanX];
      command = 'look_north';
      break;
    case Maze.DirectionType.EAST:
      square = Maze.map[Maze.pegmanY][Maze.pegmanX + 1];
      command = 'look_east';
      break;
    case Maze.DirectionType.SOUTH:
      square = Maze.map[Maze.pegmanY + 1] &&
          Maze.map[Maze.pegmanY + 1][Maze.pegmanX];
      command = 'look_south';
      break;
    case Maze.DirectionType.WEST:
      square = Maze.map[Maze.pegmanY][Maze.pegmanX - 1];
      command = 'look_west';
      break;
  }
  if (id) {
    BlocklyApps.log.push([command, id]);
  }
  return square !== Maze.SquareType.WALL &&
        square !== Maze.SquareType.OBSTACLE &&
        square !== undefined;
};

/**
 * Updates the tooManyBlocksError message with the ideal number of blocks so the
 *     student can better understand how to improve their code.
 */
Maze.setIdealBlockMessage = function() {
  var idealNumMsg = document.getElementById('idealNumberMessage');
  var idealNumText = document.createTextNode(Maze.IDEAL_BLOCK_NUM);
  idealNumMsg.appendChild(idealNumText);
};

/**
 * The mode of the maze we are in.
 * If mode = 1, we are in the original maze; if mode = 2, we are in the adaptive
 * maze with additional levels.
 */
BlocklyApps.MAX_MODE = 2;
BlocklyApps.MODE =
    BlocklyApps.getNumberParamFromUrl('mode', 1, BlocklyApps.MAX_MODE);
