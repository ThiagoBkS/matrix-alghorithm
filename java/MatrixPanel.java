import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

public class MatrixPanel extends JPanel {
    private final BufferedImage canvas;
    private final int fps = 24;
    private double rainDropProbability = 0.9;
    private final int columns = 64;
    private final Color backgroundColor = new Color(0, 0, 0, 25);
    private final Color rainColor = new Color(0, 255, 70);
    private final int[] rainDrops = new int[columns];
    private final Font font;
    private final int fontSize;
    private final UnicodeAlphabet unicodeAlphabet = UnicodeAlphabet.ARABIC;

    private final Random random = new Random();

    public MatrixPanel(int width, int height) {
        this.fontSize = width / columns + 1;
        this.font = new Font("Monospaced", Font.BOLD, fontSize);

        this.canvas = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        setPreferredSize(new Dimension(width, height));

        new Timer(1000 / fps, e -> updateCanvas()).start();
    }

    public void updateCanvas() {
        Graphics2D graphics = canvas.createGraphics();

        graphics.setColor(backgroundColor);
        graphics.fillRect(0, 0, canvas.getWidth(), canvas.getHeight());

        graphics.setFont(font);
        graphics.setColor(rainColor);

        for (int column = 0; column < columns; column++) {
            int posX = column * fontSize;
            int posY = rainDrops[column] * fontSize;

            graphics.drawString(String.valueOf(unicodeAlphabet.getRandomChar()), posX, posY);

            if (posY > canvas.getHeight() && random.nextDouble() > rainDropProbability)
                rainDrops[column] = 0;
            else
                rainDrops[column]++;
        }

        graphics.dispose();
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.drawImage(canvas, 0, 0, null);
    }
}
