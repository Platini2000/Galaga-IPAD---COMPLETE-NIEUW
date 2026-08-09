const ENEMY1_TYPE = "enemy1";
const ENEMY2_TYPE = "enemy2";
const ENEMY3_TYPE = "enemy3";
const ENEMY_WIDTH = 40;
const ENEMY_HEIGHT = 40;
const ENEMY1_SCALE_FACTOR = 1.33;
const ENEMY1_WIDTH = Math.round(ENEMY_WIDTH * ENEMY1_SCALE_FACTOR);
const ENEMY1_HEIGHT = Math.round(ENEMY_HEIGHT * ENEMY1_SCALE_FACTOR);
const BOSS_SCALE_FACTOR = 1.5;
const BOSS_WIDTH = Math.round(ENEMY_WIDTH * BOSS_SCALE_FACTOR);
const BOSS_HEIGHT = Math.round(ENEMY_HEIGHT * BOSS_SCALE_FACTOR);
const SHIP_WIDTH = 50;
const SHIP_HEIGHT = 50;
const SHIP_BOTTOM_MARGIN = 30;
const SHIP_MOVE_SPEED = 10;
const COOP_SHIP_HORIZONTAL_OFFSET_FACTOR = 0.15;
const CHALLENGING_STAGE_ENEMY_COUNT = 40;
const CHALLENGING_STAGE_SQUADRON_SIZE = 5;
const CHALLENGING_STAGE_SQUADRON_COUNT = CHALLENGING_STAGE_ENEMY_COUNT / CHALLENGING_STAGE_SQUADRON_SIZE;
const BASE_CS_SPEED_MULTIPLIER = 6.2;
const MAX_CS_SPEED_MULTIPLIER = 7.0;
const CS_HORIZONTAL_FLYBY_SPEED_FACTOR = 0.22;
const CS_ENEMY_SPAWN_DELAY_IN_SQUADRON = 80;
const CS_HORIZONTAL_FLYBY_SPAWN_DELAY = -15;
const CS_LOOP_ATTACK_SPAWN_DELAY = 35;
const CHALLENGING_STAGE_SQUADRON_INTERVAL = 3000;
const PATH_T_OFFSET_PER_ENEMY = 0.05;
const ENEMY2_MAX_HITS = 1;
const ENEMY3_MAX_HITS = 2;
const LEVEL_CAP_FOR_SCALING = 50;
const NEXT_WAVE_DELAY_AFTER_MESSAGE = 2000;
const BASE_GRID_FIRE_INTERVAL = 2800;
const MIN_GRID_FIRE_INTERVAL = 700;
const BASE_GRID_FIRE_PROBABILITY = 0.04;
const MAX_GRID_FIRE_PROBABILITY = 0.18;
const BASE_GRID_MAX_FIRING_ENEMIES = 7;
const MAX_GRID_MAX_FIRING_ENEMIES = 16;
const BASE_RETURN_SPEED_FACTOR = 1.5;
const MAX_RETURN_SPEED_FACTOR = 2.5;
const PLAYER_GAME_OVER_MESSAGE_DURATION_COOP = 3000;
const AI_CAPTURE_BEAM_APPROACH_DELAY_MS = 2000;
const COOP_AI_CAPTURE_DIVE_ANTICIPATION_DURATION_MS = 3000;
const COOP_AI_SAVE_PARTNER_DELAY_MS = 10000;

let starrySkyCanvas, starryCtx, retroGridCanvas, retroGridCtx, gameCanvas, gameCtx;
let stars = [];
let gridOffsetY = 0;
let isInGameState = false;
let isShowingScoreScreen = false;
let scoreScreenStartTime = 0;
let highScore = 20000;
let highScoreHolderId = null;
let playerLives = 3;
let score = 0;
let level = 1;
let isTwoPlayerMode = false;
let selectedGameMode = 'normal';
let currentPlayer = 1;
let player1Lives = 3;
let player2Lives = 3;
let player1Score = 0;
let player2Score = 0;
let player1CompletedLevel = -1;
let player1MaxLevelReached = 1;
let player2MaxLevelReached = 1;
let isPlayerSelectMode = false;
let isOnePlayerGameTypeSelectMode = false;
let isOnePlayerNormalGameSubTypeSelectMode = false;
let isOnePlayerVsAIGameTypeSelectMode = false;
let isGameModeSelectMode = false;
let isFiringModeSelectMode = false;
let selectedFiringMode = 'rapid';
let selectedOnePlayerGameVariant = '';
let isPlayerTwoAI = false;
let p1JustFiredSingle = false;
let p2JustFiredSingle = false;
let p1FireInputWasDown = false;
let p2FireInputWasDown = false;
let scoreEarnedThisCS = 0;
let player1LifeThresholdsMet = new Set();
let player2LifeThresholdsMet = new Set();
let isManualControl = false;
let isShowingDemoText = false;
let autoStartTimerId = null;
let gameJustStarted = false;
let mainLoopId = null;
let isShowingIntro = false;
let introStep = 0;
let introDisplayStartTime = 0;
let lastMouseMoveResetTime = 0;
let isChallengingStage = false;
let isFullGridWave = false;
let isWaveTransitioning = false;
let showCsHitsMessage = false;
let csHitsMessageStartTime = 0;
let showExtraLifeMessage = false;
let extraLifeMessageStartTime = 0;
let showPerfectMessage = false;
let perfectMessageStartTime = 0;
let showCSClearMessage = false;
let csClearMessageStartTime = 0;
let showCsHitsForClearMessage = false;
let showCsScoreForClearMessage = false;
let showReadyMessage = false;
let readyMessageStartTime = 0;
let showCsBonusScoreMessage = false;
let csBonusScoreMessageStartTime = 0;
let readyForNextWave = false;
let readyForNextWaveReset = false;
let isCsCompletionDelayActive = false;
let csCompletionDelayStartTime = 0;
let csCompletionResultIsPerfect = false;
let csIntroSoundPlayed = false;
let playerIntroSoundPlayed = false;
let stageIntroSoundPlayed = false;
let playLevelUpAfterCSBonus = false;
let isShowingPlayerGameOverMessage = false;
let playerGameOverMessageStartTime = 0;
let playerWhoIsGameOver = 0;
let nextActionAfterPlayerGameOver = '';
let isPlayer1ShowingGameOverMessage = false;
let player1GameOverMessageStartTime = 0;
let isPlayer2ShowingGameOverMessage = false;
let player2GameOverMessageStartTime = 0;
let forceCenterShipNextReset = false;
let isShipCaptured = false;
let isPlayer1ShipCaptured = false;
let isPlayer2ShipCaptured = false;
let capturingBossId = null;
let captureBeamActive = false;
let captureBeamSource = { x: 0, y: 0 };
let captureBeamTargetY = 0;
let captureBeamProgress = 0;
let captureAttemptMadeThisLevel = false;
let isWaitingForRespawn = false;
let isPlayer1WaitingForRespawn = false;
let isPlayer2WaitingForRespawn = false;
let respawnTime = 0;
let player1RespawnTime = 0;
let player2RespawnTime = 0;
let isInvincible = false;
let isPlayer1Invincible = false;
let isPlayer2Invincible = false;
let invincibilityEndTime = 0;
let player1InvincibilityEndTime = 0;
let player2InvincibilityEndTime = 0;
let fallingShips = [];
let isDualShipActive = false;
let player1IsDualShipActive = false;
let player2IsDualShipActive = false;
let isShowingCaptureMessage = false;
let captureMessageStartTime = 0;
let capturedBossIdWithMessage = null;
let enemies = [];
let normalWaveEntrancePaths = {};
let challengingStagePaths = {};
let currentWaveDefinition = null;
let isEntrancePhaseActive = false;
let enemySpawnTimeouts = [];
let totalEnemiesScheduledForWave = 0;
let enemiesSpawnedThisWave = 0;
let lastEnemyDetachTime = 0;
let gridMoveDirection = 1;
let lastGridFireCheckTime = 0;
let firstEnemyLanded = false;
let currentGridOffsetX = 0;
let challengingStageEnemiesHit = 0;
let challengingStageTotalEnemies = CHALLENGING_STAGE_ENEMY_COUNT;
let isGridBreathingActive = false;
let gridBreathStartTime = 0;
let currentGridBreathFactor = 0;

let ship = { x: 0, y: 0, width: SHIP_WIDTH, height: SHIP_HEIGHT, speed: SHIP_MOVE_SPEED, targetX: 0, id: 'main' };
let ship1 = null;
let ship2 = null;
let leftPressed = false;
let rightPressed = false;
let shootPressed = false;
let p2LeftPressed = false;
let p2RightPressed = false;
let p2ShootPressed = false;
let keyboardP1LeftDown = false;
let keyboardP1RightDown = false;
let keyboardP1ShootDown = false;
let keyboardP2LeftDown = false;
let keyboardP2RightDown = false;
let keyboardP2ShootDown = false;

let bullets = [];
let enemyBullets = [];
let explosions = [];
let hitSparks = [];
let playerLastShotTime = 0;
let player1LastShotTime = 0;
let player2LastShotTime = 0;
let aiLastShotTime = 0;
let aiCanShootTime = 0;
let connectedGamepadIndex = null;
let connectedGamepadIndexP2 = null;
let previousButtonStates = [];
let previousDemoButtonStates = [];
let previousGameButtonStates = [];
let previousGameButtonStatesP2 = [];
let selectedButtonIndex = -1;
let joystickMovedVerticallyLastFrame = false;
let isGridSoundPlaying = false;
let gridJustCompleted = false;
let player1ShotsFired = 0;
let player2ShotsFired = 0;
let player1EnemiesHit = 0;
let player2EnemiesHit = 0;
let isShowingResultsScreen = false;
let gameOverSequenceStartTime = 0;
let gameStartTime = 0;
let visualOffsetX = -20;
let floatingScores = [];
let csCurrentChainHits = 0;
let csCurrentChainScore = 0;
let csLastHitTime = 0;
let csLastChainHitPosition = null;
let normalWaveCurrentChainHits = 0;
let normalWaveCurrentChainScore = 0;
let normalWaveLastHitTime = 0;
let normalWaveLastHitPosition = null;
let squadronCompletionStatus = {};
let squadronEntranceFiringStatus = {};
let isPaused = false;
let mouseIdleTimerId = null;
let initialGameStartSoundPlayedThisSession = false;
let coopStartSoundPlayedThisSession = false;
let wasLastGameAIDemo = false;
let player1TriggeredHighScoreSound = false;
let player2TriggeredHighScoreSound = false;
let isShowingCoopPlayersReady = false;
let coopPlayersReadyStartTime = 0;
let gameJustStartedAndWaveLaunched = false;
let isCoopAIDemoActive = false;
let demoModeCounter = 0;
let smoothedShip1X = undefined;
let smoothedShip2X = undefined;
let aiShip1TargetEnemy = null;
let aiShip2TargetEnemy = null;
let aiShip1CanShootTime = 0;
let aiShip2CanShootTime = 0;
let aiShip1LastShotTime = 0;
let aiShip2LastShotTime = 0;
let aiPlayerActivelySeekingCaptureById = null;
let coopAICaptureDiveAnticipationActive = false;
let coopAICaptureDiveAnticipationEndTime = 0;
let player1CaptureRespawnX = 0;
let player2CaptureRespawnX = 0;
let player1NeedsRespawnAfterCapture = false;
let player2NeedsRespawnAfterCapture = false;
let capturedShipRespawnX_NormalMode = 0;
let coopPartner1CapturedTime = 0;
let coopPartner2CapturedTime = 0;
let touchStartX = 0;
let touchStartY = 0;
let touchCurrentX = 0;
let touchCurrentY = 0;
let touchStartTime = 0;
let isTouchActiveGame = false;
let isTouchActiveMenu = false;
let touchedMenuButtonIndex = -1;
let lastTapTime = 0;
let isShowingPortraitMessage = false;
let gameWasAutoPausedForPortrait = false;

const TOUCH_TAP_MAX_DURATION = 250;
const TOUCH_TAP_MAX_MOVEMENT = 20;
const TOUCH_SHIP_CONTROL_AREA_Y_FACTOR = 0.5;

const shipImage = new Image();
const beeImage = new Image();
const butterflyImage = new Image();
const bossGalagaImage = new Image();
const bulletImage = new Image();
const enemyBulletImage = new Image();
const logoImage = new Image();

shipImage.src = 'Afbeeldingen/spaceship.png';
beeImage.src = 'Afbeeldingen/bee.png';
bulletImage.src = 'Afbeeldingen/bullet.png';
bossGalagaImage.src = 'Afbeeldingen/bossGalaga.png';
butterflyImage.src = 'Afbeeldingen/butterfly.png';
logoImage.src = 'Afbeeldingen/Logo.png';
enemyBulletImage.src = 'Afbeeldingen/bullet-enemy.png';

const beeImage2 = new Image();
const butterflyImage2 = new Image();
const bossGalagaImage2 = new Image();

beeImage2.src = 'Afbeeldingen/bee-2.png';
butterflyImage2.src = 'Afbeeldingen/butterfly-2.png';
bossGalagaImage2.src = 'Afbeeldingen/bossGalaga-2.png';

const level1Image = new Image();
const level5Image = new Image();
const level10Image = new Image();
const level20Image = new Image();
const level30Image = new Image();
const level50Image = new Image();

level1Image.src = 'Afbeeldingen/Level-1.png';
level5Image.src = 'Afbeeldingen/Level-5.png';
level10Image.src = 'Afbeeldingen/Level-10.png';
level20Image.src = 'Afbeeldingen/Level-20.png';
level30Image.src = 'Afbeeldingen/Level-30.png';
level50Image.src = 'Afbeeldingen/Level-50.png';

let audioContext;
let soundBuffers = {};
let soundSources = {};
let soundGainNodes = {};
let audioContextInitialized = false;

const soundPaths = {
    'captureSound': 'Geluiden/Capture.mp3',
    'shipCapturedSound': 'Geluiden/Capture-ship.mp3',
    'dualShipSound': 'Geluiden/Capture-ship.mp3',
    'playerShootSound': 'Geluiden/firing.mp3',
    'explosionSound': 'Geluiden/kill.mp3',
    'gameOverSound': 'Geluiden/gameover.mp3',
    'lostLifeSound': 'Geluiden/lost-live.mp3',
    'entranceSound': 'Geluiden/Entree.mp3',
    'bossGalagaDiveSound': 'Geluiden/Enemy2.mp3',
    'levelUpSound': 'Geluiden/LevelUp.mp3',
    'enemyShootSound': 'Geluiden/Fire-enemy.mp3',
    'butterflyDiveSound': 'Geluiden/flying.mp3',
    'startSound': 'Geluiden/Start.mp3',
    'coinSound': 'Geluiden/coin.mp3',
    'beeHitSound': 'Geluiden/Bees-hit.mp3',
    'butterflyHitSound': 'Geluiden/Butterfly-hit.mp3',
    'bossHit1Sound': 'Geluiden/Boss-hit1.mp3',
    'bossHit2Sound': 'Geluiden/Boss-hit2.mp3',
    'gridBackgroundSound': 'Geluiden/Achtergrond-grid.mp3',
    'extraLifeSound': 'Geluiden/Extra-Leven.mp3',
    'csPerfectSound': 'Geluiden/CS-Stage-Perfect-.mp3',
    'csClearSound': 'Geluiden/CS-Clear.mp3',
    'waveUpSound': 'Geluiden/Waveup.mp3',
    'menuMusicSound': 'Geluiden/Menu-music.mp3',
    'readySound': 'Geluiden/ready.mp3',
    'tripleAttackSound': 'Geluiden/Triple.mp3',
    'resultsMusicSound': 'Geluiden/results-music.mp3',
    'hiScoreSound': 'Geluiden/hi-score.mp3'
};

const BASE_ENEMY_BULLET_SPEED = 6;
const MAX_ENEMY_BULLET_SPEED = 6;
const BASE_ENEMY_ATTACK_SPEED = 5.5;
const MAX_ENEMY_ATTACK_SPEED = 8;
const BASE_MAX_ATTACKING_ENEMIES = 10;
const MAX_MAX_ATTACKING_ENEMIES = 22;
const BASE_GRID_MOVE_SPEED = 0.3;
const MAX_GRID_MOVE_SPEED = 0.7;
const BASE_GRID_BREATH_CYCLE_MS = 2000;
const MIN_GRID_BREATH_CYCLE_MS = 1000;
const BASE_ENEMY_BULLET_BURST_COUNT = 1;
const MAX_ENEMY_BULLET_BURST_COUNT = 3;
const BASE_ENEMY_AIM_FACTOR = 0.75;
const MAX_ENEMY_AIM_FACTOR = 0.95;
const BASE_BEE_GROUP_ATTACK_PROBABILITY = 0.05;
const MAX_BEE_GROUP_ATTACK_PROBABILITY = 0.4;
const BASE_BEE_TRIPLE_ATTACK_PROBABILITY = 0.1;
const MAX_BEE_TRIPLE_ATTACK_PROBABILITY = 0.5;

const PLAYER_BULLET_WIDTH = 5;
const PLAYER_BULLET_HEIGHT = 15;
const PLAYER_BULLET_SPEED = 14;
const DUAL_SHIP_BULLET_OFFSET_X = SHIP_WIDTH * 0.5;
const ENEMY_BULLET_WIDTH = 4;
const ENEMY_BULLET_HEIGHT = 12;

const NUM_STARS = 500;
const MAX_STAR_RADIUS = 1.5;
const MIN_STAR_RADIUS = 0.5;
const TWINKLE_SPEED = 0.015;
const BASE_PARALLAX_SPEED = 0.3;
const PARALLAX_SPEED_FACTOR = 2;
const STAR_FADE_START_FACTOR_ABOVE_HORIZON = 0.25;

const GRID_RGB_PART = '100, 180, 255';
const GRID_BASE_ALPHA = 0.8;
const GRID_MIN_ALPHA = 0.3;
const GRID_FIXED_LINES_ALPHA = 0.5;
const GRID_LINE_COLOR_FIXED = 'rgba(' + GRID_RGB_PART + ', ' + GRID_FIXED_LINES_ALPHA + ')';
const GRID_LINE_WIDTH = 2;
const GRID_SPEED = 0.4;
const GRID_HORIZON_Y_FACTOR = 0.74;
const GRID_BASE_SPACING = 15;
const GRID_SPACING_POWER = 2;
const GRID_HORIZONTAL_LINE_WIDTH_FACTOR = 1.5;
const GRID_NUM_PERSPECTIVE_LINES = 14;
const GRID_HORIZON_SPREAD_FACTOR = 1.2;
const GRID_BOTTOM_SPREAD_FACTOR = 2;
const GRID_PERSPECTIVE_POWER = 1;

const MENU_INACTIVITY_TIMEOUT = 20000;
const SCORE_SCREEN_DURATION = 20000;
const ENTRANCE_SPEED = 6;
const BASE_RETURN_SPEED = ENTRANCE_SPEED;
const NORMAL_ENTRANCE_PATH_SPEED = 0.013934592;
const BOSS_LOOP_ENTRANCE_PATH_SPEED = 0.055738368;
const ENEMY_SPAWN_DELAY_IN_SQUADRON = 100;
const ENTRANCE_PAIR_HORIZONTAL_GAP = 5;
const ENTRANCE_PAIR_PATH_T_OFFSET = 0;
const NORMAL_WAVE_SQUADRON_INTERVAL = 1800;
const ENTRANCE_FIRE_BURST_DELAY_MS = 80;
const CS_ENTRANCE_PATH_SPEED = 0.0022;
const CS_COMPLETION_MESSAGE_DELAY = 1000;
const ENEMY_ANIMATION_INTERVAL_MS = 250;

const AXIS_DEAD_ZONE_MENU = 0.3;
const AXIS_DEAD_ZONE_GAMEPLAY = 0.15;
const PS5_BUTTON_CROSS = 0;
const PS5_BUTTON_CIRCLE = 1;
const PS5_BUTTON_TRIANGLE = 3;
const PS5_BUTTON_R1 = 5;
const PS5_DPAD_UP = 12;
const PS5_DPAD_DOWN = 13;
const PS5_DPAD_LEFT = 14;
const PS5_DPAD_RIGHT = 15;
const PS5_LEFT_STICK_X = 0;
const PS5_LEFT_STICK_Y = 1;

const SHOOT_COOLDOWN = 140;
const CS_MULTI_BULLET_COUNT = 2;
const CS_MULTI_BULLET_SPREAD_ANGLE_DEG = 8;

const GRID_ROWS = 5;
const GRID_COLS = 10;
const ENEMY_V_SPACING = 20;
const ENEMY_H_SPACING_FIXED = 30;
const ENEMY_TOP_MARGIN = 117;
const GRID_HORIZONTAL_MARGIN_PERCENT = 0.18;
const GRID_BREATH_ENABLED = true;
const GRID_BREATH_MAX_EXTRA_H_SPACING_FACTOR = 0.5;
const GRID_BREATH_MAX_EXTRA_V_SPACING_FACTOR = 0.3;

const ENEMY1_DIVE_SPEED_FACTOR = 0.65;
const ENEMY2_DIVE_SPEED_FACTOR = 0.75;
const ENEMY3_ATTACK_SPEED_FACTOR = 0.8;
const BOSS_CAPTURE_DIVE_SPEED_FACTOR = 0.85;
const GROUP_DETACH_DELAY_MS = 80;
const GROUP_FIRE_BURST_DELAY = 600;
const SOLO_BUTTERFLY_FIRE_DELAY = 600;

const BOSS_CAPTURE_DIVE_PROBABILITY = 0.15;
const CAPTURE_DIVE_SIDE_MARGIN_FACTOR = 0.15;
const CAPTURE_DIVE_BOTTOM_HOVER_Y_FACTOR = 0.7;
const CAPTURE_BEAM_DURATION_MS = 5000;
const CAPTURE_BEAM_ANIMATION_DURATION_MS = 500;
const CAPTURE_BEAM_WIDTH_TOP_FACTOR = 0.7;
const CAPTURE_BEAM_WIDTH_BOTTOM_FACTOR = 1.8;
const CAPTURE_BEAM_COLOR_START = 'rgba(180, 180, 255, 0.1)';
const CAPTURE_BEAM_COLOR_END = 'rgba(220, 220, 255, 0.6)';
const CAPTURE_BEAM_PULSE_SPEED = 0.004;

const CAPTURED_SHIP_SCALE = 1;
const CAPTURED_SHIP_OFFSET_X = (BOSS_WIDTH - SHIP_WIDTH) / 2;
const CAPTURED_SHIP_OFFSET_Y = -SHIP_HEIGHT * 0.5;
const CAPTURE_MESSAGE_DURATION = 3000;
const CAPTURED_SHIP_TINT_COLOR = 'rgba(255, 150, 150, 0.55)';
const CAPTURED_SHIP_FIRE_COOLDOWN_MS = 500;

const RESPAWN_DELAY_MS = 2000;
const INVINCIBILITY_DURATION_MS = 2000;
const INVINCIBILITY_BLINK_ON_MS = 100;
const INVINCIBILITY_BLINK_OFF_MS = 50;

const FALLING_SHIP_SPEED = 3.5;
const FALLING_SHIP_FADE_DURATION_MS = 1500;
const FALLING_SHIP_ROTATION_DURATION_MS = 1500;
const FALLING_SHIP_ROTATION_SPEED = 0.1;
const DUAL_SHIP_DOCK_TIME_MS = 1000;
const DUAL_SHIP_OFFSET_X = SHIP_WIDTH;
const AUTO_DOCK_THRESHOLD = 20;

const FLOATING_SCORE_DURATION = 500;
const FLOATING_SCORE_APPEAR_DELAY = -50;
const FLOATING_SCORE_FONT = "bold 12px 'Press Start 2P'";
const FLOATING_SCORE_OPACITY = 0.5;
const FLOATING_SCORE_COLOR_GRID = "888888";
const FLOATING_SCORE_COLOR_ACTIVE = "rgba(0, 191, 255, 0.9)";
const FLOATING_SCORE_COLOR_CS_CHAIN = "888888";

const CS_CHAIN_SCORE_THRESHOLD = 4;
const CS_CHAIN_BREAK_TIME_MS = 500;
const NORMAL_WAVE_CHAIN_BONUS_ENABLED = false;
const NORMAL_WAVE_CHAIN_SCORE_THRESHOLD = 4;
const NORMAL_WAVE_CHAIN_BREAK_TIME_MS = 750;

const EXPLOSION_DURATION = 650;
const EXPLOSION_PARTICLE_COUNT = 25;
const EXPLOSION_MAX_SPEED = 5.5;
const EXPLOSION_MIN_SPEED = 1.5;
const EXPLOSION_PARTICLE_RADIUS = 4;
const EXPLOSION_FADE_SPEED = 2.8;
const EXPLOSION_MAX_OPACITY = 0.8;

const HIT_SPARK_COUNT = 8;
const HIT_SPARK_LIFETIME = 1500;
const HIT_SPARK_SPEED = 4.5;
const HIT_SPARK_SIZE = 2.5;
const HIT_SPARK_COLOR = "rgba(255, 255, 180, 0.9)";
const HIT_SPARK_GRAVITY = 0.05;
const HIT_SPARK_FADE_SPEED = 1 / HIT_SPARK_LIFETIME;

const UI_TEXT_MARGIN_TOP = 35;
const UI_1UP_BLINK_ON_MS = 600;
const UI_1UP_BLINK_OFF_MS = 400;
const UI_1UP_BLINK_CYCLE_MS = UI_1UP_BLINK_ON_MS + UI_1UP_BLINK_OFF_MS;

const AI_SHOOT_COOLDOWN = 140;
const AI_STABILIZATION_DURATION = 500;
const AI_POSITION_MOVE_SPEED_FACTOR = 1.2;
const AI_COLLISION_LOOKAHEAD = SHIP_HEIGHT * 3.5;
const AI_COLLISION_BUFFER = SHIP_WIDTH * 0.6;
const FINAL_DODGE_LOOKAHEAD = AI_COLLISION_LOOKAHEAD * 4.5;
const FINAL_DODGE_BUFFER_BASE = AI_COLLISION_BUFFER * 3.5;
const ENTRANCE_BULLET_DODGE_LOOKAHEAD = FINAL_DODGE_LOOKAHEAD * 1.1;
const ENTRANCE_BULLET_DODGE_BUFFER = FINAL_DODGE_BUFFER_BASE * 1.1;
const FINAL_AI_DODGE_MOVE_SPEED_FACTOR = 3.8;
const AI_SHOOT_ALIGNMENT_THRESHOLD = 0.15;
const AI_SHOT_CLEARANCE_BUFFER = PLAYER_BULLET_WIDTH * 1.5;
const MAX_PREDICTION_TIME_CS = 0.7;
const NORMAL_MOVE_FRACTION = 0.08;
const CS_AI_MOVE_FRACTION = 0.16;
const AI_SMOOTHING_FACTOR_MOVE = 0.05;
const CS_MOVE_SPEED_FACTOR = 1.8;
const NORMAL_WAVE_ATTACKING_DODGE_BUFFER_MULTIPLIER = 1.2;
const NORMAL_WAVE_ATTACKING_DODGE_SPEED_MULTIPLIER = 1.1;
const STABILIZE_MOVE_FRACTION = 0.05;
const ENTRANCE_DODGE_MOVE_FRACTION = 0.15;
const AI_MOVEMENT_DEADZONE = 0.8;
const AI_SMOOTHING_FACTOR = 0.1;
const AI_EDGE_BUFFER = SHIP_WIDTH * 0.5;
const AI_ANTI_CORNER_BUFFER = AI_EDGE_BUFFER * 2.5;
const BEE_DODGE_BUFFER_HORIZONTAL_FACTOR = 1.5;
const FINAL_SHOOT_ALIGNMENT_THRESHOLD = 2;
const GRID_SHOOT_ALIGNMENT_FACTOR = 1.5;
const ENTRANCE_SHOOT_ALIGNMENT_FACTOR = 1.2;
const ENTRANCE_AI_DODGE_MOVE_SPEED_FACTOR = 4;
const AI_WIGGLE_AMPLITUDE = SHIP_WIDTH * 0.15;
const AI_WIGGLE_PERIOD = 3000;
const AI_EDGE_SHOOT_BUFFER_FACTOR = 2;
const AI_EDGE_SHOOT_TARGET_THRESHOLD_FACTOR = 0.75;
const ENTRANCE_SHOOT_BULLET_CHECK_LOOKAHEAD = SHIP_HEIGHT * 1.5;
const ENTRANCE_SHOOT_BULLET_CHECK_BUFFER = SHIP_WIDTH * 0.8;
const MAX_PREDICTION_TIME = 0.8;
const LOCAL_CS_POSITION_MIN_X = 0;
const LOCAL_CS_POSITION_MAX_X = 0;
const CS_SHOOTING_MOVE_FRACTION = 0.25;
const CS_SHOOTING_MOVE_SPEED_FACTOR = 2;
const CS_PREDICTION_FACTOR = 1;
const AI_CAPTURE_WAIT_DURATION_MS = 2000;

const INTRO_DURATION_PER_STEP = 4000;
const TWO_PLAYER_STAGE_INTRO_DURATION = 4000;
const READY_MESSAGE_DURATION = 3000;
const CS_HITS_MESSAGE_DURATION = 1000;
const CS_PERFECT_MESSAGE_DURATION = 1000;
const CS_BONUS_MESSAGE_DURATION = 8000;
const CS_CLEAR_DELAY = 8000;
const CS_CLEAR_HITS_DELAY = 1000;
const CS_CLEAR_SCORE_DELAY = 2000;
const EXTRA_LIFE_MESSAGE_DURATION = 3000;
const RECURRING_EXTRA_LIFE_INTERVAL = 70000;
const POST_MESSAGE_RESET_DELAY = 1000;
const EXTRA_LIFE_THRESHOLD_1 = 20000;
const EXTRA_LIFE_THRESHOLD_2 = 70000;
const GAME_OVER_DURATION = 5000;

const waveEntrancePatterns = [
    [
        {
            pathId: 'entrance_flight_1',
            enemies: [
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 4, entrancePathId: 'entrance_flight_1' },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 5, entrancePathId: 'entrance_flight_1' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 4, entrancePathId: 'entrance_flight_1' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 5, entrancePathId: 'new_path_left' }
            ]
        },
        {
            pathId: 'entrance_flight_2',
            enemies: [
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 4, entrancePathId: 'entrance_flight_2' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 5, entrancePathId: 'entrance_flight_2' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 4, entrancePathId: 'entrance_flight_2' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 5, entrancePathId: 'new_path_right' }
            ]
        },
        {
            pathId: 'boss_loop_left',
            enemies: [
                { type: ENEMY3_TYPE, gridRow: 0, gridCol: 4, entrancePathId: 'boss_loop_left', hasCapturedShip: false },
                { type: ENEMY3_TYPE, gridRow: 0, gridCol: 5, entrancePathId: 'boss_loop_left', hasCapturedShip: false },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 3, entrancePathId: 'boss_loop_left' },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 6, entrancePathId: 'boss_loop_left' },
                { type: ENEMY3_TYPE, gridRow: 0, gridCol: 3, entrancePathId: 'boss_loop_left', hasCapturedShip: false },
                { type: ENEMY3_TYPE, gridRow: 0, gridCol: 6, entrancePathId: 'boss_loop_left', hasCapturedShip: false },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 3, entrancePathId: 'boss_loop_left' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 6, entrancePathId: 'boss_loop_left' }
            ]
        },
        {
            pathId: 'boss_loop_right',
            enemies: [
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 1, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 2, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 7, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 8, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 1, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 2, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 7, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 8, entrancePathId: 'boss_loop_right' }
            ]
        },
        {
            pathId: 'mid_curve_left',
            enemies: [
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 6, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 7, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 8, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 9, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 6, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 7, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 8, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 9, entrancePathId: 'mid_curve_left' }
            ]
        },
        {
            pathId: 'mid_curve_right',
            enemies: [
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 0, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 1, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 2, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 3, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 0, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 1, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 2, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 3, entrancePathId: 'mid_curve_right' }
            ]
        }
    ],
    [
        {
            pathId: 'new_path_left',
            enemies: [
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 4, entrancePathId: 'entrance_flight_1' },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 5, entrancePathId: 'new_path_left' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 4, entrancePathId: 'entrance_flight_1' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 5, entrancePathId: 'entrance_flight_1' }
            ]
        },
        {
            pathId: 'entrance_flight_2',
            enemies: [
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 4, entrancePathId: 'entrance_flight_2' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 5, entrancePathId: 'entrance_flight_2' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 4, entrancePathId: 'entrance_flight_2' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 5, entrancePathId: 'new_path_right' }
            ]
        },
        {
            pathId: 'boss_loop_left',
            enemies: [
                { type: ENEMY3_TYPE, gridRow: 0, gridCol: 4, entrancePathId: 'boss_loop_left', hasCapturedShip: false },
                { type: ENEMY3_TYPE, gridRow: 0, gridCol: 5, entrancePathId: 'boss_loop_left', hasCapturedShip: false },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 3, entrancePathId: 'boss_loop_left' },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 6, entrancePathId: 'boss_loop_left' },
                { type: ENEMY3_TYPE, gridRow: 0, gridCol: 3, entrancePathId: 'boss_loop_left', hasCapturedShip: false },
                { type: ENEMY3_TYPE, gridRow: 0, gridCol: 6, entrancePathId: 'boss_loop_left', hasCapturedShip: false },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 3, entrancePathId: 'boss_loop_left' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 6, entrancePathId: 'boss_loop_left' }
            ]
        },
        {
            pathId: 'boss_loop_right',
            enemies: [
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 1, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 2, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 7, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 1, gridCol: 8, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 1, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 2, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 7, entrancePathId: 'boss_loop_right' },
                { type: ENEMY2_TYPE, gridRow: 2, gridCol: 8, entrancePathId: 'boss_loop_right' }
            ]
        },
        {
            pathId: 'mid_curve_left',
            enemies: [
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 6, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 7, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 8, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 9, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 6, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 7, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 8, entrancePathId: 'mid_curve_left' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 9, entrancePathId: 'mid_curve_left' }
            ]
        },
        {
            pathId: 'mid_curve_right',
            enemies: [
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 0, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 1, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 2, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 3, gridCol: 3, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 0, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 1, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 2, entrancePathId: 'mid_curve_right' },
                { type: ENEMY1_TYPE, gridRow: 4, gridCol: 3, entrancePathId: 'mid_curve_right' }
            ]
        }
    ]
];

const MARGIN_TOP = 5;
const MARGIN_SIDE = 105;
const SCORE_OFFSET_Y = 25;
const LIFE_ICON_SIZE = 35;
const LIFE_ICON_SPACING = 8;
const LIFE_ICON_MARGIN_BOTTOM = -1;
const LIFE_ICON_MARGIN_LEFT = MARGIN_SIDE - 30;
const LEVEL_ICON_SIZE = 35;
const LEVEL_ICON_MARGIN_BOTTOM = LIFE_ICON_MARGIN_BOTTOM;
const LEVEL_ICON_MARGIN_RIGHT = MARGIN_SIDE - 30;
const LEVEL_ICON_SPACING = LIFE_ICON_SPACING;

function checkCollision(rect1, rect2) {
    if (!rect1 || !rect2) return false;
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function initializeAudioContext() {
    if (audioContextInitialized) return;
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            const unlock = () => {
                audioContext.resume().then(() => {
                    console.log("AudioContext resumed successfully after user gesture.");
                    audioContextInitialized = true;
                    window.removeEventListener('click', unlock);
                    window.removeEventListener('touchstart', unlock);
                }).catch(err => console.error("Error resuming AudioContext:", err));
            };
            window.addEventListener('click', unlock, { once: true });
            window.addEventListener('touchstart', unlock, { once: true });
        } else {
            audioContextInitialized = true;
        }
    } catch (err) {
        console.error("Web Audio API is not supported in this browser.", err);
    }
}

async function loadSound(name, path) {
    if (!audioContext) {
        console.warn("AudioContext not initialized, cannot load sound: " + name);
        return;
    }
    if (soundBuffers[name]) return;
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error('HTTP error! status: ' + response.status + ' for ' + path);
        const arrayBuffer = await response.arrayBuffer();
        audioContext.decodeAudioData(arrayBuffer, (decodedData) => {
            soundBuffers[name] = decodedData;
        }, (err) => {
            console.error('Error decoding audio data for ' + name + ' (' + path + '):', err);
        });
    } catch (err) {
        console.error('Error fetching sound ' + name + ' (' + path + '):', err);
    }
}

function loadAllSounds() {
    if (!audioContext) return;
    for (const name in soundPaths) {
        loadSound(name, soundPaths[name]);
    }
}

function initializeDOMElements() {
    starrySkyCanvas = document.getElementById('starrySkyCanvas');
    starryCtx = starrySkyCanvas ? starrySkyCanvas.getContext('2d') : null;
    retroGridCanvas = document.getElementById('retroGridCanvas');
    retroGridCtx = retroGridCanvas ? retroGridCanvas.getContext('2d') : null;
    gameCanvas = document.getElementById('gameCanvas');
    gameCtx = gameCanvas ? gameCanvas.getContext('2d') : null;
    
    if (!starryCtx || !retroGridCtx || !gameCtx) {
        console.error("Error loading critical canvas elements.");
        alert("FATAL: Could not initialize one or more canvas contexts!");
        document.body.innerHTML = '<p style="color:white;">FATAL ERROR</p>';
        return false;
    }
    
    if (gameCanvas.width === 0 || gameCanvas.height === 0) {
        const width = window.innerWidth || 800;
        const height = window.innerHeight || 600;
        if (starrySkyCanvas) {
            starrySkyCanvas.width = width;
            starrySkyCanvas.height = height;
        }
        if (retroGridCanvas) {
            retroGridCanvas.width = width;
            retroGridCanvas.height = height;
        }
        gameCanvas.width = width;
        gameCanvas.height = height;
    }
    
    floatingScores = [];
    csCurrentChainHits = 0;
    csCurrentChainScore = 0;
    csLastHitTime = 0;
    csLastChainHitPosition = null;
    normalWaveCurrentChainHits = 0;
    normalWaveCurrentChainScore = 0;
    normalWaveLastHitTime = 0;
    normalWaveLastHitPosition = null;
    
    initializeAudioContext();
    
    if (audioContext) {
        loadAllSounds();
        setTimeout(() => {
            if (!audioContextInitialized && audioContext.state === 'suspended') {
                console.warn("AudioContext still suspended. User interaction needed to play sounds.");
            }
            setVolume('captureSound', 0.4);
            setVolume('shipCapturedSound', 0.4);
            setVolume('dualShipSound', 0.4);
            setVolume('playerShootSound', 0.6);
            setVolume('explosionSound', 0.4);
            setVolume('gameOverSound', 0.2);
            setVolume('lostLifeSound', 0.2);
            setVolume('enemyShootSound', 0.4);
            setVolume('butterflyDiveSound', 0.2);
            setVolume('startSound', 0.4);
            setVolume('coinSound', 0.4);
            setVolume('beeHitSound', 0.3);
            setVolume('butterflyHitSound', 0.3);
            setVolume('bossHit1Sound', 0.6);
            setVolume('bossHit2Sound', 0.4);
            setVolume('gridBackgroundSound', 0.1);
            setVolume('extraLifeSound', 0.5);
            setVolume('csPerfectSound', 0.6);
            setVolume('csClearSound', 0.6);
            setVolume('waveUpSound', 0.8);
            setVolume('menuMusicSound', 0.2);
            setVolume('readySound', 0.1);
            setVolume('tripleAttackSound', 0.3);
            setVolume('resultsMusicSound', 0.2);
            setVolume('hiScoreSound', 0.2);
        }, 100);
    }
    
    if (gameCanvas) {
        gameCanvas.addEventListener('touchstart', handleTouchStartGlobal, { passive: false });
        gameCanvas.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
        gameCanvas.addEventListener('touchend', handleTouchEndGlobal, { passive: false });
        gameCanvas.addEventListener('touchcancel', handleTouchEndGlobal, { passive: false });
    }
    
    const imagesList = [
        shipImage, beeImage, bulletImage, bossGalagaImage, butterflyImage, logoImage,
        level1Image, level5Image, level10Image, level20Image, level30Image, level50Image,
        beeImage2, butterflyImage2, bossGalagaImage2
    ];
    
    imagesList.forEach(img => {
        if (img) {
            img.onerror = () => console.error('Error loading image: ' + img.src);
        }
    });
    
    return true;
}

function scaleValue(levelVal, baseVal, maxVal) {
    const cappedLevel = Math.max(1, Math.min(levelVal, LEVEL_CAP_FOR_SCALING));
    if (cappedLevel === 1) return baseVal;
    const progress = (cappedLevel - 1) / (LEVEL_CAP_FOR_SCALING - 1);
    return baseVal + (maxVal - baseVal) * progress;
}

function setupInitialEventListeners() {
    try {
        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);
        window.addEventListener('resize', resizeCanvases);
    } catch (err) {
        console.error('Error setting up initial event listeners:', err);
    }
}

function getCurrentGridSlotPosition(row, col, enemyWidth) {
    if (!gameCanvas || gameCanvas.width === 0 || row < 0 || col < 0) {
        return { x: gameCanvas ? gameCanvas.width / 2 : 200, y: ENEMY_TOP_MARGIN || 100 };
    }
    const fixedEnemyWidth = ENEMY_WIDTH;
    let spacingH = ENEMY_H_SPACING_FIXED;
    let spacingV = ENEMY_V_SPACING;
    
    if (GRID_BREATH_ENABLED && isGridBreathingActive) {
        const extraH = ENEMY_H_SPACING_FIXED * GRID_BREATH_MAX_EXTRA_H_SPACING_FACTOR * currentGridBreathFactor;
        spacingH = ENEMY_H_SPACING_FIXED + extraH;
        const extraV = ENEMY_V_SPACING * GRID_BREATH_MAX_EXTRA_V_SPACING_FACTOR * currentGridBreathFactor;
        spacingV = ENEMY_V_SPACING + extraV;
    }
    
    const totalWidth = GRID_COLS * fixedEnemyWidth + (GRID_COLS - 1) * spacingH;
    const gridLeft = Math.round((gameCanvas.width - totalWidth) / 2);
    const absoluteLeft = gridLeft + currentGridOffsetX;
    const targetX = absoluteLeft + col * (fixedEnemyWidth + spacingH);
    const centerOffset = (fixedEnemyWidth - enemyWidth) / 2;
    const xPos = Math.round(targetX + centerOffset);
    const yPos = Math.round(ENEMY_TOP_MARGIN + row * (ENEMY_HEIGHT + ENEMY_V_SPACING));
    
    return { x: xPos, y: yPos };
}

function playSound(name, loop = false, volume = 1) {
    if (!audioContext || !audioContextInitialized || audioContext.state === 'suspended' || !soundBuffers[name]) return;
    if (isShowingPortraitMessage) return;
    if (isPaused && name !== 'menuMusicSound') return;
    
    if (name !== 'menuMusicSound' && name !== 'gridBackgroundSound') {
        stopSound(name);
    } else {
        if ((name === 'menuMusicSound' || name === 'gridBackgroundSound') && soundSources[name]) return;
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = soundBuffers[name];
    source.loop = loop;
    
    let gainNode = soundGainNodes[name];
    if (!gainNode) {
        gainNode = audioContext.createGain();
        soundGainNodes[name] = gainNode;
    }
    
    const adjustedVolume = Math.max(0, Math.min(2, volume));
    gainNode.gain.setValueAtTime(adjustedVolume, audioContext.currentTime);
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    source.start(0);
    soundSources[name] = source;
    source.onended = () => {
        if (soundSources[name] === source) {
            delete soundSources[name];
        }
    };
}

function stopSound(name) {
    if (soundSources[name]) {
        const source = soundSources[name];
        delete soundSources[name];
        try {
            if (source && typeof source.onended === 'function') {
                source.onended = null;
            }
            source.stop(0);
        } catch (err) {}
    }
}

function setVolume(name, volume) {
    if (!audioContext) return;
    if (!soundGainNodes[name]) {
        soundGainNodes[name] = audioContext.createGain();
        soundGainNodes[name].connect(audioContext.destination);
    }
    const adjustedVolume = Math.max(0, Math.min(2, volume));
    soundGainNodes[name].gain.setValueAtTime(adjustedVolume, audioContext.currentTime);
}

function triggerFullscreen() {
    if (!document.fullscreenElement) {
        const elem = document.documentElement;
        let promise = null;
        if (elem.requestFullscreen) {
            promise = elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            promise = elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            promise = elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            promise = elem.msRequestFullscreen();
        }
        
        const resumeMusic = () => {
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    audioContextInitialized = true;
                    playSound('menuMusicSound', true, 0.2);
                }).catch(err => console.error('Error resuming AudioContext for fullscreen music:', err));
            } else if (audioContext) {
                playSound('menuMusicSound', true, 0.2);
            }
        };
        
        if (promise) {
            promise.then(() => {
                resumeMusic();
            }).catch(err => {
                console.error('Error attempting to enable full-screen mode: ' + err.message + ' (' + err.name + ')');
                resumeMusic();
            });
        } else {
            console.warn('Fullscreen API is not supported by this browser.');
            resumeMusic();
        }
    } else {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                audioContextInitialized = true;
                playSound('menuMusicSound', true, 0.2);
            });
        } else if (audioContext) {
            playSound('menuMusicSound', true, 0.2);
        }
    }
}

function createStar() {
    if (!starrySkyCanvas || starrySkyCanvas.width === 0) return null;
    return {
        x: Math.random() * starrySkyCanvas.width,
        y: Math.random() * starrySkyCanvas.height,
        radius: Math.random() * (MAX_STAR_RADIUS - MIN_STAR_RADIUS) + MIN_STAR_RADIUS,
        alpha: Math.random() * 0.8 + 0.2,
        alphaChange: (Math.random() > 0.5 ? 1 : -1) * TWINKLE_SPEED * (Math.random() * 0.5 + 0.5)
    };
}

function createStars() {
    stars = [];
    if (starrySkyCanvas && starrySkyCanvas.width > 0 && starrySkyCanvas.height > 0) {
        for (let i = 0; i < NUM_STARS; i++) {
            const star = createStar();
            if (star) stars.push(star);
        }
    }
}

function drawStars() {
    try {
        if (!starryCtx || !starrySkyCanvas || starrySkyCanvas.width === 0 || starrySkyCanvas.height === 0) return;
        const width = starrySkyCanvas.width;
        const height = starrySkyCanvas.height;
        starryCtx.clearRect(0, 0, width, height);
        
        const horizonY = Math.round(height * GRID_HORIZON_Y_FACTOR);
        const gridAreaHeight = height - horizonY;
        const fadeStartY = Math.max(0, horizonY - gridAreaHeight * STAR_FADE_START_FACTOR_ABOVE_HORIZON);
        const fadeEndY = horizonY;
        const fadeRange = Math.max(1, fadeEndY - fadeStartY);
        
        stars.forEach(star => {
            const speedMultiplier = (star.radius - MIN_STAR_RADIUS) / (MAX_STAR_RADIUS - MIN_STAR_RADIUS);
            const speed = BASE_PARALLAX_SPEED + speedMultiplier * PARALLAX_SPEED_FACTOR;
            
            if (!isPaused || isShowingPortraitMessage) {
                star.y += speed;
            }
            if (star.y > height + star.radius) {
                star.y = -star.radius * 2;
                star.x = Math.random() * width;
            }
            if (!isPaused || isShowingPortraitMessage) {
                star.alpha += star.alphaChange;
                if (star.alpha <= 0.1 || star.alpha >= 1) {
                    star.alphaChange *= -1;
                    star.alpha = Math.max(0.1, Math.min(1, star.alpha));
                }
            }
            
            let drawAlpha = star.alpha;
            if (fadeStartY >= 0 && star.y > fadeStartY) {
                if (star.y >= horizonY) {
                    drawAlpha = 0;
                } else {
                    drawAlpha *= 1 - Math.min(1, Math.max(0, (star.y - fadeStartY) / fadeRange));
                }
            }
            
            drawAlpha = Math.max(0, Math.min(1, drawAlpha));
            if (drawAlpha > 0.01) {
                starryCtx.beginPath();
                starryCtx.arc(Math.round(star.x), Math.round(star.y), star.radius, 0, Math.PI * 2);
                starryCtx.fillStyle = 'rgba(255, 255, 255, ' + drawAlpha.toFixed(3) + ')';
                starryCtx.fill();
            }
        });
    } catch (err) {
        console.error("Error in drawStars:", err);
        if (mainLoopId) cancelAnimationFrame(mainLoopId);
        mainLoopId = null;
    }
}

function drawRetroGrid() {
    try {
        if (!retroGridCtx || !retroGridCanvas || retroGridCanvas.width === 0 || retroGridCanvas.height === 0) return;
        
        if (!isPaused || isShowingPortraitMessage) {
            gridOffsetY -= GRID_SPEED;
        }
        
        const width = retroGridCanvas.width;
        const height = retroGridCanvas.height;
        retroGridCtx.clearRect(0, 0, width, height);
        
        const horizonY = Math.round(height * GRID_HORIZON_Y_FACTOR);
        const centerX = width / 2;
        const gridHeight = height - horizonY;
        
        retroGridCtx.lineWidth = GRID_LINE_WIDTH;
        const maxLineW = width * GRID_HORIZONTAL_LINE_WIDTH_FACTOR;
        const leftBoundary = centerX - maxLineW / 2;
        const rightBoundary = centerX + maxLineW / 2;
        const fadeStartBound = horizonY + gridHeight * 0.1;
        const bottomBound = height;
        const fadeRange = Math.max(1, bottomBound - fadeStartBound);
        
        retroGridCtx.strokeStyle = GRID_LINE_COLOR_FIXED;
        retroGridCtx.beginPath();
        retroGridCtx.moveTo(leftBoundary, horizonY);
        retroGridCtx.lineTo(rightBoundary, horizonY);
        retroGridCtx.stroke();
        
        let yOffset = gridOffsetY % GRID_BASE_SPACING;
        if (yOffset > 0) {
            yOffset -= GRID_BASE_SPACING;
        }
        
        let currentY = horizonY - yOffset;
        if (currentY <= horizonY) {
            currentY += GRID_BASE_SPACING;
        }
        
        while (currentY < height + GRID_BASE_SPACING) {
            let progress = Math.max(0, Math.min(1, (currentY - horizonY) / gridHeight));
            if (currentY > horizonY && currentY <= height + GRID_LINE_WIDTH * 2) {
                let alpha;
                if (currentY <= fadeStartBound) {
                    alpha = GRID_MIN_ALPHA;
                } else if (currentY >= bottomBound) {
                    alpha = GRID_BASE_ALPHA;
                } else {
                    const ratio = (currentY - fadeStartBound) / fadeRange;
                    alpha = GRID_MIN_ALPHA + (GRID_BASE_ALPHA - GRID_MIN_ALPHA) * ratio;
                }
                alpha = Math.max(0, Math.min(GRID_BASE_ALPHA, alpha));
                if (alpha > 0.01) {
                    retroGridCtx.strokeStyle = 'rgba(' + GRID_RGB_PART + ', ' + alpha.toFixed(3) + ')';
                    retroGridCtx.beginPath();
                    retroGridCtx.moveTo(leftBoundary, Math.round(currentY));
                    retroGridCtx.lineTo(rightBoundary, Math.round(currentY));
                    retroGridCtx.stroke();
                }
            }
            let spacingMultiplier = GRID_BASE_SPACING * Math.pow(1 + progress * 1.5, GRID_SPACING_POWER);
            currentY += Math.max(1, spacingMultiplier);
        }
        
        retroGridCtx.strokeStyle = GRID_LINE_COLOR_FIXED;
        retroGridCtx.beginPath();
        const halfLines = Math.floor(GRID_NUM_PERSPECTIVE_LINES / 2);
        const horizonSpread = width * GRID_HORIZON_SPREAD_FACTOR;
        const bottomSpread = width * GRID_BOTTOM_SPREAD_FACTOR;
        
        for (let i = 0; i <= halfLines; i++) {
            let factor = Math.pow(i / halfLines, GRID_PERSPECTIVE_POWER);
            let topOffsetR = centerX + factor * (horizonSpread / 2);
            let topOffsetL = centerX - factor * (horizonSpread / 2);
            let bottomOffsetR = centerX + factor * (bottomSpread / 2);
            let bottomOffsetL = centerX - factor * (bottomSpread / 2);
            
            retroGridCtx.moveTo(topOffsetR, horizonY);
            retroGridCtx.lineTo(bottomOffsetR, height);
            if (i > 0) {
                retroGridCtx.moveTo(topOffsetL, horizonY);
                retroGridCtx.lineTo(bottomOffsetL, height);
            }
        }
        retroGridCtx.stroke();
    } catch (err) {
        console.error("Error in drawRetroGrid:", err);
    }
}

function calculateBezierPoint(t, p0, p1, p2, p3) {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;
    let point = uuu * p0;
    point += 3 * uu * t * p1;
    point += 3 * u * tt * p2;
    point += ttt * p3;
    return point;
}

function defineChallengingStagePaths() {
    challengingStagePaths = {};
    const canvasW = gameCanvas ? gameCanvas.width : 0;
    const canvasH = gameCanvas ? gameCanvas.height : 0;
    if (!canvasW || !canvasH || canvasW === 0) {
        console.error("Cannot define CS paths: Canvas size unknown or zero width.");
        return;
    }
    const eW = ENEMY_WIDTH;
    const eH = ENEMY_HEIGHT;
    const startY = -eH * 1.5;
    const offScreenH = canvasH + eH * 2;
    const offScreenL = -eW * 1.5;
    const offScreenR = canvasW + eW * 1.5;
    const halfW = canvasW / 2;
    const halfH = canvasH / 2;
    const pathOffset = -28;
    
    const scaleX = 0.5 - (37.8 / 800) * 0.3;
    const scaleY = 1.0;
    const loopX = canvasW * scaleX;
    const loopY = canvasH * (450 / 600);
    const midX1 = canvasW * 0.49;
    const midY1 = canvasH * Math.min(1, scaleY);
    const midX2 = canvasW * 0.48;
    const midY2 = canvasH * (300 / 600);
    
    const startL = { x: loopX, y: startY };
    const targetL = { x: loopX, y: loopY };
    const cpL1 = { x: loopX, y: startY + (loopY - startY) * 0.33 };
    const cpL2 = { x: loopX, y: startY + (loopY - startY) * 0.66 };
    const p0L = targetL;
    const p1L = { x: midX1, y: midY1 };
    const p2L = { x: midX2, y: midY2 };
    const p3L = { x: offScreenL, y: startY };
    
    const pLeftSegments = [
        { p0: startL, p1: cpL1, p2: cpL2, p3: targetL },
        { p0: p0L, p1: p1L, p2: p2L, p3: p3L }
    ];
    
    const pRightSegments = pLeftSegments.map(p => ({
        p0: { x: canvasW - p.p0.x, y: p.p0.y },
        p1: { x: canvasW - p.p1.x, y: p.p1.y },
        p2: { x: canvasW - p.p2.x, y: p.p2.y },
        p3: { x: p.p3.x === offScreenL ? offScreenR : canvasW - p.p3.x, y: p.p3.y }
    }));
    
    const applyOffset = (segments, offsetVal) => {
        return segments.map(seg => {
            const cloned = JSON.parse(JSON.stringify(seg));
            if (cloned.p0 && typeof cloned.p0.x === 'number') cloned.p0.x += offsetVal;
            if (cloned.p1 && typeof cloned.p1.x === 'number') cloned.p1.x += offsetVal;
            if (cloned.p2 && typeof cloned.p2.x === 'number') cloned.p2.x += offsetVal;
            if (cloned.p3 && typeof cloned.p3.x === 'number' && cloned.p3.x !== offScreenL && cloned.p3.x !== offScreenR) {
                cloned.p3.x += offsetVal;
            }
            return cloned;
        });
    };
    
    challengingStagePaths['CS_HorizontalFlyByL'] = applyOffset(pLeftSegments, pathOffset);
    challengingStagePaths['CS_HorizontalFlyByR'] = applyOffset(pRightSegments, pathOffset);
    
    const flyByY = canvasH * 0.7;
    const flyByDeltaY = canvasH * 0.03;
    const flyByCtrlX = canvasW * 0.15;
    
    challengingStagePaths['CS3_DiveLoopL_Sharp'] = [{
        p0: { x: offScreenL, y: flyByY },
        p1: { x: offScreenL + flyByCtrlX, y: flyByY - flyByDeltaY },
        p2: { x: offScreenR - flyByCtrlX, y: flyByY + flyByDeltaY },
        p3: { x: offScreenR, y: flyByY }
    }];
    
    challengingStagePaths['CS3_DiveLoopR_Sharp'] = [{
        p0: { x: offScreenR, y: flyByY },
        p1: { x: offScreenR - flyByCtrlX, y: flyByY - flyByDeltaY },
        p2: { x: offScreenL + flyByCtrlX, y: flyByY + flyByDeltaY },
        p3: { x: offScreenL, y: flyByY }
    }];
    
    const loopMaxY = canvasH * 0.8;
    const loopMinY = canvasH * 0.55;
    const loopOffsetTopY = canvasH * 0.15;
    
    challengingStagePaths['CS_LoopAttack_TL'] = [
        {
            p0: { x: canvasW * 0.1, y: startY },
            p1: { x: canvasW * 0.2, y: canvasH * 0.2 },
            p2: { x: canvasW * 0.6, y: loopMaxY },
            p3: { x: canvasW * 0.7, y: loopMaxY }
        },
        {
            p0: { x: canvasW * 0.7, y: loopMaxY },
            p1: { x: canvasW * 0.8, y: loopMaxY },
            p2: { x: canvasW * 0.8, y: loopMinY },
            p3: { x: canvasW * 0.7, y: loopMinY }
        },
        {
            p0: { x: canvasW * 0.7, y: loopMinY },
            p1: { x: canvasW * 0.6, y: loopMinY },
            p2: { x: offScreenR, y: loopOffsetTopY },
            p3: { x: offScreenR, y: loopOffsetTopY + canvasH * 0.1 }
        }
    ];
    
    challengingStagePaths['CS_LoopAttack_TR'] = [
        {
            p0: { x: canvasW * 0.9, y: startY },
            p1: { x: canvasW * 0.8, y: canvasH * 0.2 },
            p2: { x: canvasW * 0.4, y: loopMaxY },
            p3: { x: canvasW * 0.3, y: loopMaxY }
        },
        {
            p0: { x: canvasW * 0.3, y: loopMaxY },
            p1: { x: canvasW * 0.2, y: loopMaxY },
            p2: { x: canvasW * 0.2, y: loopMinY },
            p3: { x: canvasW * 0.3, y: loopMinY }
        },
        {
            p0: { x: canvasW * 0.3, y: loopMinY },
            p1: { x: canvasW * 0.4, y: loopMinY },
            p2: { x: offScreenL, y: loopOffsetTopY },
            p3: { x: offScreenL, y: loopOffsetTopY + canvasH * 0.1 }
        }
    ];
    
    challengingStagePaths['CS_LoopAttack_BL'] = [
        {
            p0: { x: offScreenL, y: canvasH * 0.6 },
            p1: { x: canvasW * 0.1, y: canvasH * 0.4 },
            p2: { x: canvasW * 0.6, y: canvasH * 0.2 },
            p3: { x: halfW, y: canvasH * 0.3 }
        },
        {
            p0: { x: halfW, y: canvasH * 0.3 },
            p1: { x: canvasW * 0.4, y: canvasH * 0.4 },
            p2: { x: canvasW * 0.3, y: loopMaxY * 0.9 },
            p3: { x: canvasW * 0.4, y: loopMaxY }
        },
        {
            p0: { x: canvasW * 0.4, y: loopMaxY },
            p1: { x: canvasW * 0.5, y: loopMaxY * 1.05 },
            p2: { x: halfW, y: startY },
            p3: { x: halfW + canvasW * 0.1, y: startY }
        }
    ];
    
    challengingStagePaths['CS_LoopAttack_BR'] = [
        {
            p0: { x: offScreenR, y: canvasH * 0.6 },
            p1: { x: canvasW * 0.9, y: canvasH * 0.4 },
            p2: { x: canvasW * 0.4, y: canvasH * 0.2 },
            p3: { x: halfW, y: canvasH * 0.3 }
        },
        {
            p0: { x: halfW, y: canvasH * 0.3 },
            p1: { x: canvasW * 0.6, y: canvasH * 0.4 },
            p2: { x: canvasW * 0.7, y: loopMaxY * 0.9 },
            p3: { x: canvasW * 0.6, y: loopMaxY }
        },
        {
            p0: { x: canvasW * 0.6, y: loopMaxY },
            p1: { x: canvasW * 0.5, y: loopMaxY * 1.05 },
            p2: { x: halfW, y: startY },
            p3: { x: halfW - canvasW * 0.1, y: startY }
        }
    ];
    
    for (const pathId in challengingStagePaths) {
        challengingStagePaths[pathId] = challengingStagePaths[pathId].filter(seg => 
            seg && seg.p0 && seg.p1 && seg.p2 && seg.p3 &&
            !isNaN(seg.p0.x + seg.p0.y + seg.p1.x + seg.p1.y + seg.p2.x + seg.p2.y + seg.p3.x + seg.p3.y)
        );
        if (challengingStagePaths[pathId].length === 0) {
            console.error('Error loading CS path ' + pathId + ' empty after validation! Using basic fallback.');
            challengingStagePaths[pathId] = [{ p0: { x: canvasW / 2, y: startY }, p1: { x: canvasW / 2, y: canvasH / 3 }, p2: { x: canvasW / 2, y: canvasH * 2 / 3 }, p3: { x: canvasW / 2, y: offScreenH } }];
        }
    }
}

function defineNormalWaveEntrancePaths() {
    normalWaveEntrancePaths = {};
    const canvasW = gameCanvas ? gameCanvas.width : 0;
    const canvasH = gameCanvas ? gameCanvas.height : 0;
    if (!canvasW || !canvasH || canvasW === 0) {
        console.error("Cannot define Normal Wave entrance paths: Canvas size unknown or zero width.");
        return;
    }
    const scaleX = canvasW / 800;
    const scaleY = canvasH / 600;
    const startY = -Math.max(ENEMY1_HEIGHT, ENEMY_HEIGHT) * 1.5;
    const halfW = canvasW / 2;
    const pathOffset = -25;
    const eW = ENEMY_WIDTH;
    const spacingH = ENEMY_H_SPACING_FIXED;
    const gridWidthTotal = GRID_COLS * eW + (GRID_COLS - 1) * spacingH;
    const gridLeft = Math.round((canvasW - gridWidthTotal) / 2);
    const targetX1 = gridLeft + 4 * (eW + spacingH) + eW / 2;
    const targetX2 = gridLeft + 5 * (eW + spacingH) + eW / 2;
    const midTargetX = (targetX1 + targetX2) / 2 + pathOffset;
    const gridY1 = Math.round(ENEMY_TOP_MARGIN + 1 * (ENEMY_HEIGHT + ENEMY_V_SPACING));
    const targetY = gridY1 + 60 * scaleY;
    
    const pL = [
        {
            p0: { x: (80 / 400) * 800 * scaleX + pathOffset, y: startY },
            p1: { x: (440 / 400) * 800 * scaleX + pathOffset, y: (140 / 300) * 600 * scaleY },
            p2: { x: (260 / 400) * 800 * scaleX + pathOffset, y: (340 / 300) * 600 * scaleY },
            p3: { x: midTargetX, y: targetY }
        }
    ];
    normalWaveEntrancePaths['entrance_flight_1'] = pL;
    
    const pR = pL.map(p => ({
        p0: { x: canvasW - (p.p0.x - pathOffset) + pathOffset, y: p.p0.y },
        p1: { x: canvasW - (p.p1.x - pathOffset) + pathOffset, y: p.p1.y },
        p2: { x: canvasW - (p.p2.x - pathOffset) + pathOffset, y: p.p2.y },
        p3: { x: midTargetX, y: p.p3.y }
    }));
    normalWaveEntrancePaths['entrance_flight_2'] = pR;
    
    const createBossLoopPath = (isRight) => {
        const transformX = (x) => isRight ? canvasW - x : x;
        const startXOffset = 80 * scaleX;
        const centerXVal = 300 * scaleX;
        const centerYVal = 300 * scaleY;
        const targetYVal = ENEMY_TOP_MARGIN - 20;
        
        const p0 = { x: transformX(-100 * scaleX), y: 480 * scaleY };
        const topCenter = { x: transformX(centerXVal), y: centerYVal - startXOffset };
        const leftCenter = { x: transformX(centerXVal - startXOffset), y: centerYVal };
        const bottomCenter = { x: transformX(centerXVal), y: centerYVal + startXOffset };
        const rightCenter = { x: transformX(centerXVal + startXOffset), y: centerYVal };
        const gridTarget = { x: transformX(centerXVal), y: targetYVal };
        
        const angle = Math.atan2(rightCenter.y - p0.y, rightCenter.x - p0.x);
        const handleFactor = 0.25;
        const ctrlP1 = { x: rightCenter.x - Math.cos(angle) * startXOffset * handleFactor, y: rightCenter.y - Math.sin(angle) * startXOffset * handleFactor };
        const midP = { x: (p0.x + ctrlP1.x) / 2, y: (p0.y + ctrlP1.y) / 2 };
        
        let pathSegments = [];
        pathSegments.push({
            p0: p0,
            p1: { x: p0.x + (midP.x - p0.x) * 0.33, y: p0.y + (midP.y - p0.y) * 0.33 },
            p2: { x: p0.x + (midP.x - p0.x) * 0.66, y: p0.y + (midP.y - p0.y) * 0.66 },
            p3: midP
        });
        pathSegments.push({
            p0: midP,
            p1: { x: midP.x + (ctrlP1.x - midP.x) * 0.33, y: midP.y + (ctrlP1.y - midP.y) * 0.33 },
            p2: { x: midP.x + (ctrlP1.x - midP.x) * 0.66, y: midP.y + (ctrlP1.y - midP.y) * 0.66 },
            p3: ctrlP1
        });
        
        const bezierK = 0.552284749831;
        const ctrlXOffset = startXOffset * bezierK;
        const ctrlYOffset = startXOffset * bezierK;
        
        const ctrlP2 = { x: ctrlP1.x + (ctrlP1.x - midP.x) * 0.3, y: ctrlP1.y + (ctrlP1.y - midP.y) * 0.3 };
        const ctrlP3 = { x: transformX(centerXVal + ctrlXOffset), y: centerYVal - startXOffset };
        
        pathSegments.push({ p0: ctrlP1, p1: ctrlP2, p2: ctrlP3, p3: topCenter });
        pathSegments.push({ p0: topCenter, p1: { x: transformX(centerXVal - ctrlXOffset), y: centerYVal - startXOffset }, p2: { x: leftCenter.x, y: leftCenter.y - ctrlYOffset }, p3: leftCenter });
        pathSegments.push({ p0: leftCenter, p1: { x: leftCenter.x, y: leftCenter.y + ctrlYOffset }, p2: { x: transformX(centerXVal - ctrlXOffset), y: centerYVal + startXOffset }, p3: bottomCenter });
        pathSegments.push({ p0: bottomCenter, p1: { x: transformX(centerXVal + ctrlXOffset), y: centerYVal + startXOffset }, p2: { x: rightCenter.x, y: rightCenter.y + ctrlYOffset }, p3: rightCenter });
        pathSegments.push({ p0: rightCenter, p1: { x: rightCenter.x + (leftCenter.x - rightCenter.x) * 0.33, y: rightCenter.y + (leftCenter.y - rightCenter.y) * 0.33 }, p2: { x: rightCenter.x + (leftCenter.x - rightCenter.x) * 0.66, y: rightCenter.y + (leftCenter.y - rightCenter.y) * 0.66 }, p3: leftCenter });
        pathSegments.push({ p0: leftCenter, p1: { x: leftCenter.x + (gridTarget.x - leftCenter.x) * 0.33, y: leftCenter.y + (gridTarget.y - leftCenter.y) * 0.33 }, p2: { x: leftCenter.x + (gridTarget.x - leftCenter.x) * 0.66, y: leftCenter.y + (gridTarget.y - leftCenter.y) * 0.66 }, p3: gridTarget });
        
        return pathSegments;
    };
    
    normalWaveEntrancePaths['boss_loop_left'] = createBossLoopPath(false);
    normalWaveEntrancePaths['boss_loop_right'] = createBossLoopPath(true);
    
    const middleY = 350 * scaleY;
        const startP = { x: halfW, y: startY };
        const cp1 = { x: (halfW + (750 - 400) * (2 / 3)) * scaleX, y: (-50 + (750 - -50) * (2 / 3)) * scaleY };
        const cp2 = { x: (400 + (750 - 400) * (1 / 3)) * scaleX, y: (middleY + (750 - middleY) * (1 / 3)) * scaleY };
        const targetP = { x: halfW, y: middleY };
    
    normalWaveEntrancePaths['mid_curve_right'] = [{ p0: startP, p1: cp1, p2: cp2, p3: targetP }];
    
    const startP_L = { x: halfW, y: startY };
    const cp1_L = { x: canvasW - cp1.x, y: cp1.y };
    const cp2_L = { x: canvasW - cp2.x, y: cp2.y };
    const targetP_L = { x: halfW, y: middleY };
    
    normalWaveEntrancePaths['mid_curve_left'] = [{ p0: startP_L, p1: cp1_L, p2: cp2_L, p3: targetP_L }];
    
    for (const pathId in normalWaveEntrancePaths) {
        if (!Array.isArray(normalWaveEntrancePaths[pathId])) {
            console.error('Error loading Normal Wave entrance path: ' + pathId + ' is not an array! Using basic fallback.');
            normalWaveEntrancePaths[pathId] = [{ p0: { x: canvasW / 2, y: startY }, p1: { x: canvasW / 2, y: canvasH / 3 }, p2: { x: canvasW / 2, y: canvasH * 2 / 3 }, p3: { x: canvasW / 2, y: ENEMY_TOP_MARGIN } }];
            continue;
        }
        normalWaveEntrancePaths[pathId] = normalWaveEntrancePaths[pathId].filter(p => 
            p && p.p0 && p.p1 && p.p2 && p.p3 &&
            typeof p.p0.x === 'number' && typeof p.p0.y === 'number' &&
            typeof p.p1.x === 'number' && typeof p.p1.y === 'number' &&
            typeof p.p2.x === 'number' && typeof p.p2.y === 'number' &&
            typeof p.p3.x === 'number' && typeof p.p3.y === 'number' &&
            !isNaN(p.p0.x + p.p0.y + p.p1.x + p.p1.y + p.p2.x + p.p2.y + p.p3.x + p.p3.y)
        );
        if (normalWaveEntrancePaths[pathId].length === 0) {
            console.error('Error loading Normal Wave entrance path: ' + pathId + ' empty after validation! Using basic fallback.');
            normalWaveEntrancePaths[pathId] = [{ p0: { x: canvasW / 2, y: startY }, p1: { x: canvasW / 2, y: canvasH / 3 }, p2: { x: canvasW / 2, y: canvasH * 2 / 3 }, p3: { x: canvasW / 2, y: ENEMY_TOP_MARGIN } }];
        }
    }
}

function resizeCanvases() {
    try {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width <= 0 || height <= 0) return;
        
        let isPortrait = height > width;
        if (isPortrait) {
            if (!isShowingPortraitMessage) {
                isShowingPortraitMessage = true;
                if (isInGameState && !isPaused) {
                    gameWasAutoPausedForPortrait = true;
                    togglePause();
                } else {
                    if (!isInGameState || isPaused) {
                        pauseAllSounds();
                    }
                }
            }
        } else {
            if (isShowingPortraitMessage) {
                isShowingPortraitMessage = false;
                if (gameWasAutoPausedForPortrait && isPaused) {
                    togglePause();
                } else {
                    if (!isInGameState && !isPaused) {
                        resumeAllSounds();
                    }
                }
                gameWasAutoPausedForPortrait = false;
            }
        }
        
        if (starrySkyCanvas && (starrySkyCanvas.width !== width || starrySkyCanvas.height !== height)) {
            starrySkyCanvas.width = width;
            starrySkyCanvas.height = height;
            createStars();
        }
        if (retroGridCanvas && (retroGridCanvas.width !== width || retroGridCanvas.height !== height)) {
            retroGridCanvas.width = width;
            retroGridCanvas.height = height;
        }
        if (gameCanvas && (gameCanvas.width !== width || gameCanvas.height !== height)) {
            const prevWidth = gameCanvas.width;
            gameCanvas.width = width;
            gameCanvas.height = height;
            defineNormalWaveEntrancePaths();
            defineChallengingStagePaths();
            if (isInGameState) {
                handleResizeGameElements(prevWidth, width, height);
            }
        } else {
            if (!gameCanvas || !gameCanvas.width || !gameCanvas.height) {
                defineNormalWaveEntrancePaths();
                defineChallengingStagePaths();
            }
        }
    } catch (err) {
        console.error("Error in resizeCanvases:", err);
    }
}

function handleResizeGameElements(prevWidth, newWidth, newHeight) {
    try {
        currentGridOffsetX = 0;
        if (ship) {
            if (prevWidth > 0 && newWidth > 0 && typeof ship.x !== 'undefined') {
                ship.x = (ship.x / prevWidth) * newWidth;
            } else {
                ship.x = newWidth / 2 - ship.width / 2;
            }
            ship.x = Math.max(0, Math.min(newWidth - ship.width, ship.x));
            ship.y = newHeight - SHIP_HEIGHT - SHIP_BOTTOM_MARGIN;
            ship.targetX = ship.x;
        }
        
        enemies.forEach(e => {
            if (e && (e.state === 'in_grid' || e.state === 'returning' || e.state === 'moving_to_grid')) {
                try {
                    const enemyW = e.type === ENEMY3_TYPE ? BOSS_WIDTH : e.type === ENEMY1_TYPE ? ENEMY1_WIDTH : ENEMY_WIDTH;
                    const { x: gridX, y: gridY } = getCurrentGridSlotPosition(e.gridRow, e.gridCol, enemyW);
                    e.targetGridX = gridX;
                    e.targetGridY = gridY;
                    if (e.state === 'in_grid') {
                        e.x = gridX;
                        e.y = gridY;
                    }
                } catch (err) {
                    console.error('Error recalculating grid pos for enemy ' + e.id + ' on resize:', err);
                    if (e.state === 'in_grid' || e.state === 'moving_to_grid' || e.state === 'returning') {
                        e.x = newWidth / 2;
                        e.y = ENEMY_TOP_MARGIN + e.gridRow * (ENEMY_HEIGHT + ENEMY_V_SPACING);
                        e.targetGridX = e.x;
                        e.targetGridY = e.y;
                    }
                }
            }
        });
    } catch (err) {
        console.error("Error handling game resize specifics on resize:", err);
    }
}

let lastTapArea = null;
let lastTapTimestamp = 0;
const DOUBLE_TAP_MAX_INTERVAL = 300;
const SCORE_AREA_TAP_MARGIN = 30;

function handleTouchStartGlobal(event) {
    // --- iOS Audio Unlocking direct bij de start van de touch, vóór preventDefault ---
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            audioContextInitialized = true;
        }).catch(err => console.error("Error resuming AudioContext on touchstart:", err));
    }

    event.preventDefault();
    if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchCurrentX = touch.clientX;
        touchCurrentY = touch.clientY;
        touchStartTime = Date.now();
        if (isInGameState && !isShowingPortraitMessage) {
            isTouchActiveGame = true;
            isTouchActiveMenu = false;
        } else if (!isShowingPortraitMessage) {
            isTouchActiveMenu = true;
            isTouchActiveGame = false;
            if (typeof handleCanvasTouch === 'function') {
                handleCanvasTouch(event, 'start');
            }
        }
    }
}

function handleTouchMoveGlobal(event) {
    event.preventDefault();
    if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        touchCurrentX = touch.clientX;
        touchCurrentY = touch.clientY;
        if (isTouchActiveGame && isInGameState && !isShowingPortraitMessage) {
            // Handled inside loop/game movement logic
        } else if (isTouchActiveMenu && !isInGameState && !isShowingPortraitMessage) {
            if (typeof handleCanvasTouch === 'function') {
                handleCanvasTouch(event, 'move');
            }
        }
    }
}

function handleTouchEndGlobal(event) {
    // --- iOS Audio Unlocking op touchend (resumeren en stil geluid afspelen), vóór preventDefault ---
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            audioContextInitialized = true;
            const buffer = audioContext.createBuffer(1, 1, 22050);
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.start(0);
        }).catch(err => console.error("Error resuming AudioContext on touchend:", err));
    }

    event.preventDefault();

    const now = Date.now();
    const duration = now - touchStartTime;
    let deltaX = 0, deltaY = 0;
    let clientX, clientY;
    
    if (event.changedTouches && event.changedTouches.length > 0) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
    } else {
        clientX = touchCurrentX;
        clientY = touchCurrentY;
    }
    
    if (typeof clientX === 'number' && typeof touchStartX === 'number') {
        deltaX = clientX - touchStartX;
    }
    if (typeof clientY === 'number' && typeof touchStartY === 'number') {
        deltaY = clientY - touchStartY;
    }
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const isTap = duration < TOUCH_TAP_MAX_DURATION && distance < TOUCH_TAP_MAX_MOVEMENT;
    
    const rect = gameCanvas.getBoundingClientRect();
    const scaleX = gameCanvas.width / rect.width;
    const scaleY = gameCanvas.height / rect.height;
    const interactionX = (clientX - rect.left) * scaleX;
    const interactionY = (clientY - rect.top) * scaleY;
    
    if (!isShowingPortraitMessage && isTap) {
        const clickTime = Date.now();
        let isP2ScoreArea = false;
        if (typeof MARGIN_SIDE !== 'undefined' && typeof MARGIN_TOP !== 'undefined' && gameCanvas && gameCtx) {
            gameCtx.font = "20px 'Press Start 2P'";
            let text2UPWidth = gameCtx.measureText('2UP').width;
            let text0Width = gameCtx.measureText('0').width;
            const scoreExtraHeight = 20;
            const areaLeft = gameCanvas.width - MARGIN_SIDE - Math.max(text2UPWidth, text0Width) - SCORE_AREA_TAP_MARGIN;
            const areaTop = MARGIN_TOP - SCORE_AREA_TAP_MARGIN;
            const areaWidth = Math.max(text2UPWidth, text0Width) + 2 * SCORE_AREA_TAP_MARGIN;
            const areaHeight = SCORE_OFFSET_Y + 5 + scoreExtraHeight + 2 * SCORE_AREA_TAP_MARGIN;
            
            if (interactionX >= areaLeft && interactionX <= areaLeft + areaWidth &&
                interactionY >= areaTop && interactionY <= areaTop + areaHeight) {
                isP2ScoreArea = true;
            }
        }
        
        if (isP2ScoreArea) {
            if (lastTapArea === '2up' && clickTime - lastTapTimestamp < DOUBLE_TAP_MAX_INTERVAL) {
                if (typeof stopGameAndShowMenu === 'function') {
                    stopGameAndShowMenu();
                    lastTapArea = null;
                    lastTapTimestamp = 0;
                    isTouchActiveGame = false;
                    isTouchActiveMenu = false;
                    touchedMenuButtonIndex = -1;
                    return;
                }
            }
            lastTapArea = '2up';
            lastTapTimestamp = clickTime;
        } else if (lastTapArea === '2up') {
            lastTapArea = null;
            lastTapTimestamp = 0;
        }
    }
    
    if (isTouchActiveGame && isInGameState && !isShowingPortraitMessage) {
        if (isTap) {
            if (selectedFiringMode === 'single' && !(lastTapArea === '2up' && Date.now() - lastTapTimestamp < DOUBLE_TAP_MAX_INTERVAL)) {
                if (Date.now() - lastTapTime > SHOOT_COOLDOWN / 2) {
                    let playerId = 'player1';
                    if (isTwoPlayerMode && selectedGameMode === 'coop') {
                        if (interactionX > gameCanvas.width / 2 && ship2 && player2Lives > 0) {
                            playerId = isPlayerTwoAI ? 'ai_p2' : 'player2';
                        }
                    } else if (isTwoPlayerMode && selectedGameMode === 'normal') {
                        playerId = (currentPlayer === 1) ? 'player1' : 'player2';
                    }
                    
                    if (playerId === 'player1') {
                        p1FireInputWasDown = true;
                    } else {
                        p2FireInputWasDown = true;
                    }
                    
                    if (typeof firePlayerBullet === 'function') {
                        firePlayerBullet(playerId);
                    }
                    
                    if (playerId === 'player1') {
                        p1FireInputWasDown = false;
                    } else {
                        p2FireInputWasDown = false;
                    }
                    lastTapTime = Date.now();
                }
            }
        }
        shootPressed = false;
        p2ShootPressed = false;
        isTouchActiveGame = false;
    } else if (isTouchActiveMenu && !isInGameState && !isShowingPortraitMessage) {
        isTouchActiveMenu = false;
        if (typeof handleCanvasTouch === 'function') {
            handleCanvasTouch(event, 'end', isTap);
        }
    } else {
        isTouchActiveGame = false;
        isTouchActiveMenu = false;
    }
    touchedMenuButtonIndex = -1;
}

function handleKeyDown(event) {
    try {
        if (isTouchActiveGame && isInGameState) {
            if (event.key === 'p' || event.key === 'P') {
                if (typeof togglePause === 'function') togglePause();
            } else {
                if (event.key === 'Escape' || event.key === 'Esc') {
                    if (isInGameState && typeof stopGameAndShowMenu === 'function') stopGameAndShowMenu();
                }
            }
            return;
        }
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                audioContextInitialized = true;
                console.log("AudioContext resumed by keydown.");
            });
        }
        const blockKeys = [' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape', 'w', 'a', 's', 'd', 'p', 'P', 'j', 'J', 'l', 'L', 'i', 'I'];
        if (blockKeys.includes(event.key) || blockKeys.includes(event.code)) {
            event.preventDefault();
        }
        
        let blockInput = false;
        if (isShowingPlayerGameOverMessage || gameOverSequenceStartTime > 0 || isShowingPortraitMessage) {
            blockInput = true;
        }
        if (blockInput) return;
        
        if (isInGameState) {
            if ((event.key === 'p' || event.key === 'P') && gameOverSequenceStartTime === 0 && !isShowingPlayerGameOverMessage) {
                if (typeof togglePause === 'function') togglePause();
                return;
            }
            if (!isPaused) {
                if (!isManualControl) {
                    if (isPlayerTwoAI && selectedGameMode === 'normal' && currentPlayer === 2) {
                        // Handled by AI
                    } else {
                        if (event.key === 'Escape' || event.key === 'Esc') {
                            if (typeof stopGameAndShowMenu === 'function') stopGameAndShowMenu();
                        } else {
                            if (!event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey && event.key !== 'p' && event.key !== 'P') {
                                if (typeof showMenuState === 'function') showMenuState();
                            }
                        }
                    }
                } else {
                    switch (event.code) {
                        case 'ArrowLeft':
                        case 'KeyA':
                            keyboardP1LeftDown = true;
                            break;
                        case 'ArrowRight':
                        case 'KeyD':
                            keyboardP1RightDown = true;
                            break;
                        case 'ArrowUp':
                        case 'Space':
                        case 'Numpad0':
                            keyboardP1ShootDown = true;
                            break;
                        case 'KeyJ':
                        case 'Numpad4':
                            if (isTwoPlayerMode && !isPlayerTwoAI) keyboardP2LeftDown = true;
                            break;
                        case 'KeyL':
                        case 'Numpad6':
                            if (isTwoPlayerMode && !isPlayerTwoAI) keyboardP2RightDown = true;
                            break;
                        case 'KeyI':
                            if (isTwoPlayerMode && !isPlayerTwoAI) keyboardP2ShootDown = true;
                            break;
                        case 'Escape':
                        case 'Esc':
                            if (typeof stopGameAndShowMenu === 'function') stopGameAndShowMenu();
                            break;
                    }
                    if (!keyboardP2LeftDown && isTwoPlayerMode && !isPlayerTwoAI && event.key.toLowerCase() === 'j') keyboardP2LeftDown = true;
                    if (!keyboardP2RightDown && isTwoPlayerMode && !isPlayerTwoAI && event.key.toLowerCase() === 'l') keyboardP2RightDown = true;
                    if (!keyboardP2ShootDown && isTwoPlayerMode && !isPlayerTwoAI && event.key.toLowerCase() === 'i') keyboardP2ShootDown = true;
                }
            }
        } else {
            if (isTouchActiveMenu) return;
            if (isShowingScoreScreen && !isTransitioningToDemoViaScoreScreen) {
                if (!event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey && event.key !== 'p' && event.key !== 'P') {
                    if (typeof showMenuState === 'function') showMenuState();
                    return;
                }
            } else {
                if (!isShowingScoreScreen) {
                    stopAutoDemoTimer();
                    switch (event.key) {
                        case 'ArrowUp':
                        case 'w':
                            selectedButtonIndex = selectedButtonIndex <= 0 ? 1 : 0;
                            startAutoDemoTimer();
                            break;
                        case 'ArrowDown':
                        case 's':
                            selectedButtonIndex = selectedButtonIndex >= 1 ? 0 : 1;
                            startAutoDemoTimer();
                            break;
                        case 'Enter':
                        case ' ':
                            if (isPlayerSelectMode) {
                                selectedButtonIndex === 0 ? startGame1P() : startGame2P();
                            } else {
                                if (isOnePlayerGameTypeSelectMode) {
                                    if (selectedButtonIndex === 0) {
                                        isOnePlayerGameTypeSelectMode = false;
                                        isFiringModeSelectMode = true;
                                        selectedOnePlayerGameVariant = 'CLASSIC_1P';
                                        selectedGameMode = 'normal';
                                        isTwoPlayerMode = false;
                                        isPlayerTwoAI = false;
                                        selectedButtonIndex = 0;
                                    } else {
                                        isOnePlayerGameTypeSelectMode = false;
                                        isOnePlayerVsAIGameTypeSelectMode = true;
                                        selectedButtonIndex = 0;
                                    }
                                } else {
                                    if (isOnePlayerVsAIGameTypeSelectMode) {
                                        if (selectedButtonIndex === 0) {
                                            selectedOnePlayerGameVariant = '1P_VS_AI_NORMAL';
                                            selectedGameMode = 'normal';
                                        } else {
                                            selectedOnePlayerGameVariant = '1P_VS_AI_COOP';
                                            selectedGameMode = 'coop';
                                        }
                                        isOnePlayerVsAIGameTypeSelectMode = false;
                                        isFiringModeSelectMode = true;
                                        isTwoPlayerMode = true;
                                        isPlayerTwoAI = true;
                                        selectedButtonIndex = 0;
                                    } else {
                                        if (isGameModeSelectMode) {
                                            selectedButtonIndex === 0 ? selectedGameMode = 'normal' : selectedGameMode = 'coop';
                                            isGameModeSelectMode = false;
                                            isFiringModeSelectMode = true;
                                            isTwoPlayerMode = true;
                                            isPlayerTwoAI = false;
                                            selectedButtonIndex = 0;
                                        } else {
                                            if (isFiringModeSelectMode) {
                                                selectedButtonIndex === 0 ? selectedFiringMode = 'rapid' : selectedFiringMode = 'single';
                                                baseStartGame(true);
                                            } else {
                                                if (selectedButtonIndex === 0) {
                                                    isPlayerSelectMode = true;
                                                    selectedButtonIndex = 0;
                                                } else if (selectedButtonIndex === 1) {
                                                    exitGame();
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            startAutoDemoTimer();
                            break;
                        case 'Escape':
                            goBackInMenu();
                            startAutoDemoTimer();
                            break;
                        default:
                            startAutoDemoTimer();
                            break;
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error in handleKeyDown:', err);
        keyboardP1LeftDown = false;
        keyboardP1RightDown = false;
        keyboardP1ShootDown = false;
        keyboardP2LeftDown = false;
        keyboardP2RightDown = false;
        keyboardP2ShootDown = false;
        p1JustFiredSingle = false;
        p2JustFiredSingle = false;
        p1FireInputWasDown = false;
        p2FireInputWasDown = false;
    }
}

function handleKeyUp(event) {
    try {
        switch (event.code) {
            case 'ArrowLeft':
            case 'KeyA':
                keyboardP1LeftDown = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                keyboardP1RightDown = false;
                break;
            case 'ArrowUp':
            case 'Space':
            case 'Numpad0':
                keyboardP1ShootDown = false;
                if (selectedFiringMode === 'single') {
                    p1JustFiredSingle = false;
                }
                break;
            case 'KeyJ':
            case 'Numpad4':
                keyboardP2LeftDown = false;
                break;
            case 'KeyL':
            case 'Numpad6':
                keyboardP2RightDown = false;
                break;
            case 'KeyI':
                keyboardP2ShootDown = false;
                if (selectedFiringMode === 'single') {
                    p2JustFiredSingle = false;
                }
                break;
        }
        if (event.key.toLowerCase() === 'j') keyboardP2LeftDown = false;
        if (event.key.toLowerCase() === 'l') keyboardP2RightDown = false;
        if (event.key.toLowerCase() === 'i') {
            keyboardP2ShootDown = false;
            if (selectedFiringMode === 'single') {
                p2JustFiredSingle = false;
            }
        }
    } catch (err) {
        console.error('Error in handleKeyUp:', err);
        keyboardP1LeftDown = false;
        keyboardP1RightDown = false;
        keyboardP1ShootDown = false;
        keyboardP2LeftDown = false;
        keyboardP2RightDown = false;
        keyboardP2ShootDown = false;
        p1JustFiredSingle = false;
        p2JustFiredSingle = false;
    }
}

function handleGamepadConnected(event) {
    try {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                audioContextInitialized = true;
                console.log("AudioContext resumed by gamepad connection.");
            });
        }
        if (connectedGamepadIndex === null) {
            connectedGamepadIndex = event.gamepad.index;
            const buttonsNum = event.gamepad.buttons.length;
            previousButtonStates = new Array(buttonsNum).fill(false);
            previousDemoButtonStates = new Array(buttonsNum).fill(false);
            previousGameButtonStates = new Array(buttonsNum).fill(false);
            if (!isInGameState && !isTouchActiveMenu) {
                stopAutoDemoTimer();
                selectedButtonIndex = 0;
            }
        } else {
            if (connectedGamepadIndexP2 === null) {
                connectedGamepadIndexP2 = event.gamepad.index;
                const buttonsNum = event.gamepad.buttons.length;
                previousGameButtonStatesP2 = new Array(buttonsNum).fill(false);
            }
        }
    } catch (err) {
        console.error('Error in handleGamepadConnected:', err);
    }
}

function handleGamepadDisconnected(event) {
    try {
        if (connectedGamepadIndex === event.gamepad.index) {
            connectedGamepadIndex = null;
            previousButtonStates = [];
            previousDemoButtonStates = [];
            previousGameButtonStates = [];
            if (!isInGameState && !isTouchActiveMenu) {
                selectedButtonIndex = -1;
                joystickMovedVerticallyLastFrame = false;
                startAutoDemoTimer();
            }
            p1FireInputWasDown = false;
        } else {
            if (connectedGamepadIndexP2 === event.gamepad.index) {
                connectedGamepadIndexP2 = null;
                previousGameButtonStatesP2 = [];
                p2FireInputWasDown = false;
            }
        }
    } catch (err) {
        console.error('Error in handleGamepadDisconnected:', err);
        p1JustFiredSingle = false;
        p2JustFiredSingle = false;
        p1FireInputWasDown = false;
        p2FireInputWasDown = false;
    }
}

function saveHighScore() {
    try {
        let scoreToCompare = 0;
        if (isTwoPlayerMode && selectedGameMode === 'coop') {
            scoreToCompare = Math.max(player1Score, player2Score);
        } else if (isTwoPlayerMode && selectedGameMode === 'normal') {
            scoreToCompare = Math.max(player1Score, player2Score);
        } else {
            scoreToCompare = score;
        }
        if (isManualControl && scoreToCompare > highScore) {
            highScore = scoreToCompare;
        }
    } catch (err) {
        console.error('Error in saveHighScore:', err);
    }
}

function loadHighScore() {
    try {
        highScore = 20000;
    } catch (err) {
        console.error('Error in loadHighScore:', err);
        highScore = 20000;
    }
}

function resumeAllSounds() {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log("AudioContext resumed from pause.");
            audioContextInitialized = true;
        }).catch(err => console.error("Error resuming AudioContext:", err));
    }
    if (!isInGameState && audioContext && !isTouchActiveMenu && !isShowingPortraitMessage) {
        playSound('menuMusicSound', true, 0.2);
    }
}

const soundsToPauseOnSystemPause = Object.keys(soundPaths);
let soundPausedStates = {};

function pauseAllSounds() {
    for (const name in soundSources) {
        if (Object.prototype.hasOwnProperty.call(soundSources, name)) {
            stopSound(name);
        }
    }
    isGridSoundPlaying = false;
}

function togglePause() {
    let canPause = false;
    const blockingGameOver = isShowingPlayerGameOverMessage || (isTwoPlayerMode && selectedGameMode === 'coop' && (isPlayer1ShowingGameOverMessage || isPlayer2ShowingGameOverMessage));
    
    if (isInGameState && gameOverSequenceStartTime === 0 && !blockingGameOver && !isShowingPortraitMessage) {
        if (!isManualControl) {
            canPause = true;
        } else {
            if (isTwoPlayerMode && selectedGameMode === 'coop') {
                canPause = (player1Lives > 0 && ship1 && !isPlayer1ShipCaptured && !player1NeedsRespawnAfterCapture) ||
                           (player2Lives > 0 && ship2 && !isPlayer2ShipCaptured && !player2NeedsRespawnAfterCapture);
            } else if (isTwoPlayerMode && selectedGameMode === 'normal' && isPlayerTwoAI && currentPlayer === 2) {
                canPause = false;
            } else {
                canPause = playerLives > 0 && ship && !isShipCaptured;
            }
        }
    }
    
    if (!canPause) return;
    isPaused = !isPaused;
    if (isPaused) {
        pauseAllSounds();
        clearTimeout(mouseIdleTimerId);
        mouseIdleTimerId = null;
    } else {
        resumeAllSounds();
        clearTimeout(mouseIdleTimerId);
        mouseIdleTimerId = setTimeout(hideCursor, 2000);
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                audioContextInitialized = true;
                console.log("AudioContext resumed explicitly after unpause.");
            });
        }
    }
}

function processSingleController(gamepad, prevStates) {
    const currentStates = gamepad.buttons.map(b => b.pressed);
    const buttonStates = {
        'left': false,
        'right': false,
        'shoot': false,
        'pause': false,
        'back': false,
        'newButtonStates': currentStates.slice()
    };
    
    const isCrossPressed = currentStates[PS5_BUTTON_CROSS];
    const isR1Pressed = currentStates[PS5_BUTTON_R1];
    const wasR1Pressed = prevStates[PS5_BUTTON_R1] ?? false;
    const isTrianglePressed = currentStates[PS5_BUTTON_TRIANGLE];
    const wasTrianglePressed = prevStates[PS5_BUTTON_TRIANGLE] ?? false;
    
    const axisX = gamepad.axes[PS5_LEFT_STICK_X] ?? 0;
    const dpadL = currentStates[PS5_DPAD_LEFT];
    const dpadR = currentStates[PS5_DPAD_RIGHT];
    const deadZone = AXIS_DEAD_ZONE_GAMEPLAY;
    
    if (axisX < -deadZone || dpadL) {
        buttonStates['left'] = true;
    } else if (axisX > deadZone || dpadR) {
        buttonStates['right'] = true;
    }
    
    if (isCrossPressed) {
        buttonStates['shoot'] = true;
    }
    if (isR1Pressed && !wasR1Pressed) {
        buttonStates['pause'] = true;
    }
    if (isTrianglePressed && !wasTrianglePressed) {
        buttonStates['back'] = true;
    }
    
    return buttonStates;
}

function triggerFinalGameOverSequence() {
    if (isInGameState && gameOverSequenceStartTime === 0) {
        isPaused = false;
        isShowingDemoText = false;
        isShowingIntro = false;
        isWaveTransitioning = false;
        showCsHitsMessage = false;
        showExtraLifeMessage = false;
        showPerfectMessage = false;
        showCSClearMessage = false;
        showCsHitsForClearMessage = false;
        showCsScoreForClearMessage = false;
        showReadyMessage = false;
        showCsBonusScoreMessage = false;
        isShowingPlayerGameOverMessage = false;
        isEntrancePhaseActive = false;
        isCsCompletionDelayActive = false;
        csCompletionDelayStartTime = 0;
        csCompletionResultIsPerfect = false;
        csIntroSoundPlayed = false;
        
        if (isManualControl) {
            saveHighScore();
        }
        
        const activeSounds = Object.keys(soundPaths).filter(name => name !== 'gameOverSound' && name !== 'resultsMusicSound');
        activeSounds.forEach(name => stopSound(name));
        isGridSoundPlaying = false;
        
        const now = Date.now();
        playSound('gameOverSound', false, 0.4);
        
        const coopDualLoss = isTwoPlayerMode && selectedGameMode === 'coop' && player1Lives <= 0 && player2Lives <= 0;
        const vsAIDualLoss = selectedOnePlayerGameVariant === '1P_VS_AI_COOP' && player1Lives <= 0 && player2Lives <= 0;
        
        if (coopDualLoss || vsAIDualLoss) {
            gameOverSequenceStartTime = now - GAME_OVER_DURATION;
        } else {
            gameOverSequenceStartTime = now;
        }
        
        bullets = [];
        enemyBullets = [];
        explosions = [];
        fallingShips = [];
        isDualShipActive = false;
        player1IsDualShipActive = false;
        player2IsDualShipActive = false;
        isShowingResultsScreen = false;
        previousButtonStates = [];
        previousGameButtonStates = [];
        previousDemoButtonStates = [];
        previousGameButtonStatesP2 = [];
    }
}

function triggerGameOver() {
    triggerFinalGameOverSequence();
}