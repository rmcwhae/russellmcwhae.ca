export interface Book {
    title: string
    author: string
    format?: 'audiobook'
    categories?: string[]
}

export interface YearGroup {
    year: number | 'Earlier'
    books: Book[]
}

export const CURRENTLY_READING: Book = {
    title: 'Spirit-Controlled Temperament',
    author: 'Tim LaHaye',
}

export const FEATURED_BOOKS: string[] = [
    'On Writing: A Memoir of the Craft',
    'Mere Christianity',
    'Native Air',
]

export const READING_LIST: YearGroup[] = [
    {
        year: 2026,
        books: [
            {
                title: 'Leave the World Behind',
                author: 'Rumaan Alam',
                format: 'audiobook',
                categories: ['Fiction'],
            },
            {
                title: 'Malibu Rising',
                author: 'Taylor Jenkins Reid',
                format: 'audiobook',
                categories: ['Fiction'],
            },
            {
                title: 'The Anxious Generation: How the Great Rewiring of Childhood Is Causing an Epidemic of Mental Illness',
                author: 'Jonathan Haidt',
                format: 'audiobook',
                categories: ['Psychology', 'Technology'],
            },
            {
                title: 'No More Mr. Nice Guy: A Proven Plan For Getting What You Want In Love, Sex, And Life',
                author: 'Robert A. Glover',
                format: 'audiobook',
                categories: ['Psychology'],
            },
            {
                title: 'Murder in Mesopotamia',
                author: 'Agatha Christie',
                categories: ['Fiction'],
            },
            {
                title: 'The Darkest White: A Mountain Legend and the Avalanche That Took Him',
                author: 'Eric Blehm',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Freakonomics: A Rogue Economist Explores the Hidden Side of Everything',
                author: 'Steven Levitt and Stephen J. Dubner',
                format: 'audiobook',
                categories: ['Economics'],
            },
        ],
    },
    {
        year: 2025,
        books: [
            {
                title: 'Player Piano',
                author: 'Kurt Vonnegut',
                categories: ['Fiction', 'Technology'],
            },
            {
                title: 'The Last Blue Mountain: The Great Karakoram Climbing Tragedy',
                author: 'Ralph Barker',
                categories: ['Adventure', 'History'],
            },
            {
                title: 'Ready Player Two',
                author: 'Ernest Cline',
                categories: ['Fiction', 'Technology'],
            },
            {
                title: 'Lolita',
                author: 'Vladimir Nabokov',
                format: 'audiobook',
                categories: ['Fiction'],
            },
            {
                title: 'Fire Weather: The Making of a Beast',
                author: 'John Vaillant',
                categories: ['Adventure', 'History'],
            },
            {
                title: 'The Color of Everything: A Journey to Quiet the Chaos Within',
                author: 'Cory Richards',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
                author: 'James Clear',
                categories: ['Psychology', 'Health'],
            },
            {
                title: 'Anxious for Nothing: Finding Calm in a Chaotic World',
                author: 'Max Lucado',
                format: 'audiobook',
                categories: ['Faith', 'Psychology'],
            },
            {
                title: 'Try Softer: A Fresh Approach to Move Us out of Anxiety, Stress, and Survival Mode—and into a Life of Connection and Joy',
                author: 'Aundi Kolber',
                categories: ['Psychology', 'Health'],
            },
            {
                title: 'How to Win Over Depression',
                author: 'Tim LaHaye',
                categories: ['Psychology', 'Faith'],
            },
            {
                title: 'Where the Crawdads Sing',
                author: 'Delia Owens',
                categories: ['Fiction'],
            },
            {
                title: 'Extreme Ownership: How U.S. Navy SEALs Lead and Win',
                author: 'Jocko Willink and Leif Babin',
                format: 'audiobook',
                categories: ['Biography'],
            },
            {
                title: '12 Rules for Life: An Antidote to Chaos',
                author: 'Jordan B. Peterson',
                format: 'audiobook',
                categories: ['Philosophy', 'Psychology'],
            },
            {
                title: 'God on Mute: Engaging the Silence of Unanswered Prayer',
                author: 'Pete Greig',
                format: 'audiobook',
                categories: ['Faith'],
            },
            {
                title: 'Brain Energy: A Revolutionary Breakthrough in Understanding Mental Health—and Improving Treatment for Anxiety, Depression, OCD, PTSD, and More',
                author: 'Christopher M. Palmer, MD',
                format: 'audiobook',
                categories: ['Health', 'Psychology'],
            },
            {
                title: 'The Year of Less',
                author: 'Cait Flanders',
                format: 'audiobook',
                categories: ['Psychology', 'Health'],
            },
            {
                title: 'Dream Big: Know What You Want, Why You Want It, and What You’re Going to Do About It',
                author: 'Bob Goff',
                categories: ['Faith'],
            },
            {
                title: 'Eight Dates: Essential Conversations for a Lifetime of Love',
                author: 'John Gottman and Julie Schwartz Gottman',
                categories: ['Psychology'],
            },
        ],
    },
    {
        year: 2024,
        books: [
            {
                title: 'All the Light We Cannot See',
                author: 'Anthony Doerr',
                categories: ['Fiction', 'History'],
            },
            {
                title: 'An Unquiet Mind',
                author: 'Kay Redfield Jamison',
                categories: ['Biography', 'Psychology'],
            },
            {
                title: 'The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life',
                author: 'Mark Manson',
                categories: ['Philosophy', 'Psychology'],
            },
            {
                title: 'The Meaning of Marriage: Facing the Complexities of Commitment with the Wisdom of God',
                author: 'Timothy Keller',
                categories: ['Faith', 'Philosophy'],
            },
            {
                title: 'The Year of Living Biblically: One Man’s Humble Quest to Follow the Bible as Literally as Possible',
                author: 'A.J. Jacobs',
                categories: ['Faith', 'Biography'],
            },
            {
                title: 'Love Does: Discover a Secretly Incredible Life in an Ordinary World',
                author: 'Bob Goff',
                categories: ['Faith'],
            },
            {
                title: 'My Dark Vanessa',
                author: 'Kate Elizabeth Russell',
                categories: ['Fiction'],
            },
            {
                title: 'Undistracted: Capture Your Purpose. Rediscover Your Joy.',
                author: 'Bob Goff',
                categories: ['Faith', 'Philosophy'],
            },
            {
                title: 'The Golden Spruce: A True Story of Myth, Madness, and Greed',
                author: 'John Vaillant',
                categories: ['Adventure', 'History'],
            },
            {
                title: 'Scattered Minds: The Origins and Healing of Attention Deficit Disorder',
                author: 'Gabor Maté',
                categories: ['Psychology', 'Health'],
            },
            {
                title: 'Everybody, Always: Becoming Love in a World Full of Setbacks and Difficult People',
                author: 'Bob Goff',
                categories: ['Faith'],
            },
            {
                title: 'The Essex Serpent',
                author: 'Sarah Perry',
                categories: ['Fiction'],
            },
            {
                title: 'One Hundred Years of Solitude',
                author: 'Gabriel García Márquez',
                categories: ['Fiction'],
            },
            {
                title: 'The Ruthless Elimination of Hurry: How to Stay Emotionally Healthy and Spiritually Alive in the Chaos of the Modern World',
                author: 'John Mark Comer',
                categories: ['Faith', 'Philosophy'],
            },
            {
                title: 'I Don’t Want to Talk About It: Overcoming the Secret Legacy of Male Depression',
                author: 'Terrence Real',
                categories: ['Psychology'],
            },
            {
                title: 'Outlive: The Science & Art of Longevity',
                author: 'Peter Attia, MD',
                categories: ['Health'],
            },
            {
                title: 'Ministries of Mercy: The Call of the Jericho Road',
                author: 'Timothy Keller',
                categories: ['Faith'],
            },
        ],
    },
    {
        year: 2023,
        books: [
            {
                title: 'It',
                author: 'Stephen King',
                categories: ['Fiction'],
            },
            {
                title: 'Breathless',
                author: 'Amy McCulloch',
                categories: ['Fiction', 'Adventure'],
            },
            {
                title: 'Structured Chaos: The Unusual Life of a Climber',
                author: 'Victor Saunders',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Prayer: Does It Make Any Difference?',
                author: 'Philip Yancey',
                categories: ['Faith'],
            },
            {
                title: 'The Dharma Bums',
                author: 'Jack Kerouac',
                categories: ['Fiction', 'Adventure'],
            },
            {
                title: 'Barbarian Days: A Surfing Life',
                author: 'William Finnegan',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Where the Clouds Can Go',
                author: 'Conrad Kain',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Native Air',
                author: 'Jonathan Howland',
                categories: ['Fiction', 'Adventure'],
            },
            {
                title: 'The Metamorphosis',
                author: 'Franz Kafka',
                categories: ['Fiction'],
            },
            {
                title: 'Human Traces',
                author: 'Sebastian Faulks',
                categories: ['Fiction', 'Psychology'],
            },
        ],
    },
    {
        year: 2022,
        books: [
            {
                title: 'The Secret Agent',
                author: 'Joseph Conrad',
                categories: ['Fiction'],
            },
            {
                title: 'Ridgerunner',
                author: 'Gil Adamson',
                categories: ['Fiction', 'Adventure'],
            },
            {
                title: 'What God Has to Say about Our Bodies: How the Gospel Is Good News for Our Physical Selves',
                author: 'Sam Allberry',
                categories: ['Faith'],
            },
            {
                title: 'Countdown to Zero Day: Stuxnet and the Launch of the World’s First Digital Weapon',
                author: 'Kim Zetter',
                categories: ['Technology', 'History'],
            },
            {
                title: 'The Death of Ivan Ilyich',
                author: 'Leo Tolstoy',
                categories: ['Fiction', 'Philosophy'],
            },
            {
                title: 'One Green Bottle',
                author: 'Elizabeth Coxhead',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Brave New World Revisited',
                author: 'Aldous Huxley',
                categories: ['Philosophy', 'Fiction'],
            },
            {
                title: 'Brave New World',
                author: 'Aldous Huxley',
                categories: ['Fiction', 'Philosophy'],
            },
        ],
    },
    {
        year: 2021,
        books: [
            {
                title: 'The Runaway Jury',
                author: 'John Grisham',
                categories: ['Fiction'],
            },
            {
                title: 'Uncanny Valley',
                author: 'Anna Wiener',
                categories: ['Technology', 'Biography'],
            },
            {
                title: 'The Firm',
                author: 'John Grisham',
                categories: ['Fiction'],
            },
            {
                title: 'The Mosquito Coast',
                author: 'Paul Theroux',
                categories: ['Fiction', 'Adventure'],
            },
            {
                title: 'Fearfully and Wonderfully Made',
                author: 'Dr. Paul Brand and Philip Yancey',
                categories: ['Faith', 'Health'],
            },
            {
                title: 'Carrie',
                author: 'Stephen King',
                categories: ['Fiction'],
            },
            {
                title: 'The Stand: The Complete & Uncut Edition',
                author: 'Stephen King',
                categories: ['Fiction'],
            },
            {
                title: '50 Percent of Mountaineering is Uphill',
                author: 'Susanna Pfisterer',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'The Pilgrim’s Progress',
                author: 'John Bunyan',
                categories: ['Faith', 'Fiction'],
            },
            {
                title: 'McTeague',
                author: 'Frank Norris',
                categories: ['Fiction'],
            },
            {
                title: 'On Writing: A Memoir of the Craft',
                author: 'Stephen King',
                categories: ['Biography'],
            },
            {
                title: 'The Body: A Guide for Occupants',
                author: 'Bill Bryson',
                categories: ['Health', 'Biography'],
            },
        ],
    },
    {
        year: 2020,
        books: [
            {
                title: 'Anna Karenin',
                author: 'Leo Tolstoy, trans. Rosemary Edmonds',
                categories: ['Fiction'],
            },
            {
                title: 'Reminiscences of a Stock Operator',
                author: 'Edwin Lefèvre',
                categories: ['Economics', 'Biography'],
            },
            {
                title: 'At Home in Nature',
                author: 'Rob Wood',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'This Is Depression: A Comprehensive, Compassionate Guide for Anyone Who Wants to Understand Depression',
                author: 'Diane McIntosh',
                categories: ['Psychology', 'Health'],
            },
            {
                title: 'The Question of God: C.S. Lewis and Sigmund Freud Debate God, Love, Sex, and the Meaning of Life',
                author: 'Armand Nicholi',
                categories: ['Philosophy', 'Faith'],
            },
            {
                title: 'Famous Last Words',
                author: 'Timothy Findley',
                categories: ['Fiction'],
            },
        ],
    },
    {
        year: 2019,
        books: [
            {
                title: 'South',
                author: 'Ernest Shackleton',
                categories: ['Adventure', 'Biography', 'History'],
            },
            {
                title: 'Little Fires Everywhere',
                author: 'Celeste Ng',
                categories: ['Fiction'],
            },
            {
                title: 'Educated',
                author: 'Tara Westover',
                categories: ['Biography'],
            },
            {
                title: 'Amusing Ourselves to Death: Public Discourse in the Age of Show Business',
                author: 'Neil Postman',
                categories: ['Philosophy', 'Technology'],
            },
            {
                title: 'Beyond the Mountain',
                author: 'Steve House',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Echoes: One Climber’s Hard Road to Freedom',
                author: 'Nick Bullock',
                categories: ['Adventure', 'Biography'],
            },
        ],
    },
    {
        year: 2018,
        books: [
            {
                title: 'Ready Player One',
                author: 'Ernest Cline',
                categories: ['Fiction', 'Technology'],
            },
            {
                title: 'Crazy Rich Asians',
                author: 'Kevin Kwan',
                categories: ['Fiction'],
            },
            {
                title: 'China Rich Girlfriend',
                author: 'Kevin Kwan',
                categories: ['Fiction'],
            },
            {
                title: 'Rich People Problems',
                author: 'Kevin Kwan',
                categories: ['Fiction'],
            },
            {
                title: 'The Bold and Cold: A History of 25 Classic Climbs in the Canadian Rockies',
                author: 'Brandon Pullan',
                categories: ['Adventure', 'History'],
            },
            {
                title: 'Art of Freedom: The Life and Climbs of Voytek Kurtyka',
                author: 'Bernadette McDonald',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Autonomy, Mastery and Purpose in the Avalanche Patch',
                author: 'Bruce Kay',
                categories: ['Adventure'],
            },
            {
                title: 'Mountains in My Heart: A Passion for Climbing',
                author: 'Gerlinde Kaltenbrunner',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'A Purpose Ridden',
                author: 'Ryan Correy',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Modern Romance',
                author: 'Aziz Ansari',
                categories: ['Psychology'],
            },
            {
                title: 'How to Win Friends and Influence People',
                author: 'Dale Carnegie',
                categories: ['Psychology'],
            },
            {
                title: 'Radical',
                author: 'David Platt',
                categories: ['Faith'],
            },
            {
                title: 'The 10 Best Decisions a Man Can Make: The Adventure of Living in God’s Plan',
                author: 'Bill Farrel',
                categories: ['Faith'],
            },
            {
                title: 'Soul Survivor: How My Faith Survived the Church',
                author: 'Philip Yancey',
                categories: ['Biography', 'Faith'],
            },
        ],
    },
    {
        year: 2017,
        books: [
            {
                title: 'The Reason for God: Belief in an Age of Skepticism',
                author: 'Timothy Keller',
                categories: ['Faith', 'Philosophy'],
            },
            {
                title: 'Mere Christianity',
                author: 'C.S. Lewis',
                categories: ['Faith', 'Philosophy'],
            },
            {
                title: 'The Case for a Creator',
                author: 'Lee Strobel',
                categories: ['Faith', 'Philosophy'],
            },
            {
                title: 'The Case for Faith',
                author: 'Lee Strobel',
                categories: ['Faith', 'Philosophy'],
            },
            {
                title: 'Disappointment with God',
                author: 'Philip Yancey',
                categories: ['Faith', 'Philosophy'],
            },
            {
                title: 'What’s So Amazing About Grace?',
                author: 'Philip Yancey',
                categories: ['Faith'],
            },
            {
                title: 'Who Moved the Stone?',
                author: 'Frank Morison',
                categories: ['Faith', 'History'],
            },
            {
                title: 'The Real Face of Atheism',
                author: 'Ravi Zacharias',
                categories: ['Faith', 'Philosophy'],
            },
            {
                title: 'The Problem of God',
                author: 'Mark Clark',
                categories: ['Faith', 'Philosophy'],
            },
            {
                title: 'Orthodoxy',
                author: 'Gilbert Keith Chesterton',
                categories: ['Faith', 'Philosophy'],
            },
        ],
    },
    {
        year: 2016,
        books: [
            {
                title: 'I Hope They Serve Beer in Hell',
                author: 'Tucker Max',
                categories: ['Biography'],
            },
            {
                title: 'Sloppy Seconds',
                author: 'Tucker Max',
                categories: ['Biography'],
            },
            {
                title: 'Hilarity Ensues',
                author: 'Tucker Max',
                categories: ['Biography'],
            },
            {
                title: 'Flash Boys: A Wall Street Revolt',
                author: 'Michael Lewis',
                categories: ['Economics', 'Technology'],
            },
            {
                title: 'When Breath Becomes Air',
                author: 'Paul Kalanithi',
                categories: ['Biography', 'Philosophy'],
            },
            {
                title: 'Better: A Surgeon’s Notes on Performance',
                author: 'Atul Gawande',
                categories: ['Biography', 'Health'],
            },
            {
                title: 'Being Mortal',
                author: 'Atul Gawande',
                categories: ['Health', 'Philosophy'],
            },
            {
                title: 'The Checklist Manifesto',
                author: 'Atul Gawande',
                categories: ['Health'],
            },
            {
                title: 'One Day in the Life of Ivan Denisovich',
                author: 'Aleksandr Solzhenitsyn',
                categories: ['Fiction', 'History'],
            },
        ],
    },
    {
        year: 2015,
        books: [
            {
                title: 'Summit Fever: The Story of an Armchair Climber on the 1984 Mustagh Tower Expedition',
                author: 'Andrew Greig',
                categories: ['Adventure', 'Biography'],
            },
        ],
    },
    {
        year: 2014,
        books: [
            {
                title: 'The Calling: A Life Rocked by Mountains',
                author: 'Barry Blanchard',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'One Day as a Tiger: Alex Macintyre and the Birth of Light and Fast Alpinism',
                author: 'John Porter',
                categories: ['Adventure', 'Biography', 'History'],
            },
            {
                title: 'K2: Life and Death on the World’s Most Dangerous Mountain',
                author: 'Ed Viesturs',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Annapurna: First Conquest of an 8000-meter Peak',
                author: 'Maurice Herzog',
                categories: ['Adventure', 'History'],
            },
            {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                categories: ['Fiction'],
            },
        ],
    },
    {
        year: 2013,
        books: [
            {
                title: 'Doctor Sleep',
                author: 'Stephen King',
                categories: ['Fiction'],
            },
            {
                title: 'The Will to Climb: Obsession and Commitment and the Quest to Climb Annapurna—the World’s Deadliest Peak',
                author: 'Ed Viesturs',
                categories: ['Adventure', 'Biography'],
            },
        ],
    },
    {
        year: 2012,
        books: [
            {
                title: 'No Shortcuts to the Top: Climbing the World’s 14 Highest Peaks',
                author: 'Ed Viesturs',
                categories: ['Adventure', 'Biography'],
            },
            {
                title: 'Sh*t My Dad Says',
                author: 'Justin Halpern',
                categories: ['Biography'],
            },
            {
                title: 'I Suck at Girls',
                author: 'Justin Halpern',
                categories: ['Biography'],
            },
        ],
    },
    {
        year: 'Earlier',
        books: [
            {
                title: 'Chickenhawk',
                author: 'Robert Mason',
                categories: ['Biography', 'History'],
            },
            {
                title: 'Dune',
                author: 'Frank Herbert',
                categories: ['Fiction'],
            },
            {
                title: 'Ender’s Game',
                author: 'Orson Scott Card',
                categories: ['Fiction'],
            },
            {
                title: 'Nineteen Eighty-Four',
                author: 'George Orwell',
                categories: ['Fiction', 'Philosophy'],
            },
            {
                title: 'Birdsong',
                author: 'Sebastian Faulks',
                categories: ['Fiction', 'History'],
            },
            {
                title: 'Absolute Friends',
                author: 'John le Carré',
                categories: ['Fiction'],
            },
            {
                title: 'The Guns of Navarone',
                author: 'Alistair MacLean',
                categories: ['Fiction', 'History'],
            },
            {
                title: 'Z for Zachariah',
                author: 'Robert C. O’Brien',
                categories: ['Fiction'],
            },
            {
                title: 'Dragonsbane',
                author: 'Barbara Hambly',
                categories: ['Fiction'],
            },
            {
                title: 'The Hunt for Red October',
                author: 'Tom Clancy',
                categories: ['Fiction', 'History'],
            },
            {
                title: 'Rite of Passage',
                author: 'Alexei Panshin',
                categories: ['Fiction'],
            },
            {
                title: 'Fallen Angels',
                author: 'Walter Dean Myers',
                categories: ['Fiction', 'History'],
            },
            {
                title: 'Deathwatch',
                author: 'Robb White',
                categories: ['Fiction', 'Adventure'],
            },
            {
                title: 'Different Seasons',
                author: 'Stephen King',
                categories: ['Fiction'],
            },
        ],
    },
]
